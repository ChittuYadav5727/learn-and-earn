import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { ROLES } from '../constants/roles.js';

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, default: ROLES.ADMIN },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

adminSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

adminSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.password);
};

adminSchema.methods.toSafeObject = function toSafeObject() {
  const admin = this.toObject();
  delete admin.password;
  return admin;
};

export const Admin = mongoose.model('Admin', adminSchema);
