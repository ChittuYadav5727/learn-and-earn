import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { GST_STATUSES, ROLES } from '../constants/roles.js';

const providerSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, trim: true },
    companyEmail: { type: String, required: true, trim: true, lowercase: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, default: ROLES.PROVIDER, immutable: true },
    companyDetails: {
      industry: { type: String, required: true, trim: true },
      companySize: { type: String, trim: true, default: '1-10' },
      website: { type: String, trim: true, default: '' },
      foundedYear: { type: Number },
      headquarters: { type: String, trim: true, default: '' },
      description: { type: String, trim: true, default: '' },
    },
    contactPerson: {
      name: { type: String, trim: true, default: '' },
      designation: { type: String, trim: true, default: '' },
      phone: { type: String, trim: true, default: '' },
    },
    gstStatus: {
      type: String,
      enum: Object.values(GST_STATUSES),
      default: GST_STATUSES.NOT_SUBMITTED,
    },
    verificationNotes: { type: String, trim: true, default: '' },
    stats: {
      totalPosts: { type: Number, default: 0 },
      activePosts: { type: Number, default: 0 },
      totalApplicants: { type: Number, default: 0 },
      acceptedApplicants: { type: Number, default: 0 },
    },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

providerSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

providerSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.password);
};

providerSchema.methods.toSafeObject = function toSafeObject() {
  const provider = this.toObject();
  delete provider.password;
  return provider;
};

export const Provider = mongoose.model('Provider', providerSchema);
