import { Application, GSTVerification, Opportunity, Provider } from '../models/index.js';
import { GST_STATUSES } from '../constants/roles.js';
import { refreshProviderStats } from './opportunityService.js';

export async function getProviderDashboard(providerId) {
  await refreshProviderStats(providerId);

  const [provider, gstRecord, recentPosts, recentApplicants] = await Promise.all([
    Provider.findById(providerId).select('-password').lean(),
    GSTVerification.findOne({ provider: providerId }).lean(),
    Opportunity.find({ provider: providerId }).sort({ createdAt: -1 }).limit(3).lean(),
    Application.find({ provider: providerId })
      .populate('user', 'name email')
      .populate('opportunity', 'title')
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
  ]);

  return {
    provider,
    gstStatus: provider?.gstStatus || GST_STATUSES.NOT_SUBMITTED,
    gstRecord,
    recentPosts,
    recentApplicants,
  };
}

export async function getProviderProfile(providerId) {
  return Provider.findById(providerId).select('-password').lean();
}

export async function updateProviderProfile(providerId, payload) {
  return Provider.findByIdAndUpdate(
    providerId,
    {
      $set: {
        companyName: payload.companyName,
        companyEmail: payload.companyEmail,
        'companyDetails.industry': payload.industry,
        'companyDetails.companySize': payload.companySize,
        'companyDetails.website': payload.website || '',
        'companyDetails.foundedYear': payload.foundedYear || null,
        'companyDetails.headquarters': payload.headquarters || '',
        'companyDetails.description': payload.description || '',
        'contactPerson.name': payload.contactName || '',
        'contactPerson.designation': payload.contactDesignation || '',
        'contactPerson.phone': payload.contactPhone || '',
      },
    },
    { new: true }
  )
    .select('-password')
    .lean();
}
