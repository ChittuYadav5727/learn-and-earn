import { GST_STATUSES } from '../constants/roles.js';
import { GSTVerification, Provider } from '../models/index.js';
import { AppError } from '../utils/appError.js';

export async function listPendingGstRequests() {
  return GSTVerification.find({ status: GST_STATUSES.PENDING })
    .populate('provider', 'companyName companyEmail email')
    .sort({ submittedAt: 1 })
    .lean();
}

export async function reviewGstVerification(verificationId, status, rejectionReason = '') {
  const verification = await GSTVerification.findById(verificationId);
  if (!verification) {
    throw new AppError('Verification record not found', 404);
  }

  verification.status = status;
  verification.reviewedAt = new Date();
  verification.rejectionReason = status === GST_STATUSES.REJECTED ? rejectionReason : '';
  await verification.save();

  await Provider.findByIdAndUpdate(verification.provider, {
    $set: {
      gstStatus: status,
      verificationNotes:
        status === GST_STATUSES.APPROVED
          ? 'GST approved. Opportunity posting is enabled.'
          : rejectionReason || 'GST rejected. Please resubmit with updated details.',
    },
  });

  return verification;
}
