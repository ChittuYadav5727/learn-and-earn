import mongoose from 'mongoose';
import { APPLICATION_STATUSES } from '../constants/roles.js';

const applicationSchema = new mongoose.Schema(
  {
    opportunity: { type: mongoose.Schema.Types.ObjectId, ref: 'Opportunity', required: true },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    coverLetter: { type: String, trim: true, default: '' },
    status: {
      type: String,
      enum: Object.values(APPLICATION_STATUSES),
      default: APPLICATION_STATUSES.APPLIED,
    },
    submittedAt: { type: Date, default: Date.now },
    reviewedAt: { type: Date },
  },
  { timestamps: true }
);

applicationSchema.index({ user: 1, opportunity: 1 }, { unique: true });

export const Application = mongoose.model('Application', applicationSchema);
