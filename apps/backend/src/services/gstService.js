import { GST_STATUSES } from '../constants/roles.js';
import { GSTVerification, Provider } from '../models/index.js';
import { AppError } from '../utils/appError.js';

export async function getProviderVerification(providerId) {
  return GSTVerification.findOne({ provider: providerId }).lean();
}

export async function submitGstVerification(providerId, payload) {
  const provider = await Provider.findById(providerId);
  if (!provider) {
    throw new AppError('Provider not found', 404);
  }

  const verification = await GSTVerification.findOneAndUpdate(
    { provider: providerId },
    {
      provider: providerId,
      gstNumber: payload.gstNumber,
      legalCompanyName: payload.legalCompanyName,
      registeredAddress: payload.registeredAddress,
      status: GST_STATUSES.PENDING,
      rejectionReason: '',
      submittedAt: new Date(),
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  provider.gstStatus = GST_STATUSES.PENDING;
  provider.verificationNotes = 'GST submitted and pending review';
  await provider.save();

  return verification;
}
