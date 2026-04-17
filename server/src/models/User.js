import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { ROLES } from '../constants/roles.js';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, default: ROLES.USER, immutable: true },
    selectedMode: { type: String, enum: ['learn', 'earn'], default: 'learn' },
    profile: {
      phone: { type: String, trim: true, default: '' },
      college: { type: String, trim: true, default: '' },
      degree: { type: String, trim: true, default: '' },
      graduationYear: { type: Number },
      location: { type: String, trim: true, default: '' },
      bio: { type: String, trim: true, default: '' },
      skills: [{ type: String }],
    },
    stats: {
      points: { type: Number, default: 0 },
      completedTasks: { type: Number, default: 0 },
      earnings: { type: Number, default: 0 },
      certificateCount: { type: Number, default: 0 },
    },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.toSafeObject = function toSafeObject() {
  const user = this.toObject();
  delete user.password;
  return user;
};

export const User = mongoose.model('User', userSchema);
