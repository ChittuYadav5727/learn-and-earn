import mongoose from 'mongoose';
import { CERTIFICATION_PASS_THRESHOLD } from '../constants/certification.js';

const certificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    examTitle: { type: String, required: true, trim: true },
    score: { type: Number, required: true, min: 0, max: 100 },
    passThreshold: { type: Number, default: CERTIFICATION_PASS_THRESHOLD },
    isCertified: { type: Boolean, default: false },
    result: { type: String, enum: ['passed', 'failed'], required: true },
    certificateId: { type: String, trim: true, default: '' },
    attemptedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Certification = mongoose.model('Certification', certificationSchema);
