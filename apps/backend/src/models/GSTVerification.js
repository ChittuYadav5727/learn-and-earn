import mongoose from 'mongoose';
import { GST_STATUSES } from '../constants/roles.js';

const gstVerificationSchema = new mongoose.Schema(
  {
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true, unique: true },
    gstNumber: { type: String, required: true, uppercase: true, trim: true },
    legalCompanyName: { type: String, required: true, trim: true },
    registeredAddress: { type: String, required: true, trim: true },
    status: { type: String, enum: Object.values(GST_STATUSES), default: GST_STATUSES.PENDING },
    submittedAt: { type: Date, default: Date.now },
    reviewedAt: { type: Date },
    rejectionReason: { type: String, trim: true, default: '' },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true }
);

export const GSTVerification = mongoose.model('GSTVerification', gstVerificationSchema);
