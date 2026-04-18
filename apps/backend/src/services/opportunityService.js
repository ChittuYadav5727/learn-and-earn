import { Application, Opportunity, Provider, Task } from '../models/index.js';
import { APPLICATION_STATUSES, GST_STATUSES } from '../constants/roles.js';
import { AppError } from '../utils/appError.js';

export async function listOpenOpportunities(filters = {}) {
  const query = { status: 'open' };

  if (filters.type) {
    query.type = filters.type;
  }

  return Opportunity.find(query)
    .populate('provider', 'companyName companyDetails.headquarters gstStatus')
    .sort({ createdAt: -1 })
    .lean();
}

export async function createOpportunity(providerId, payload) {
  const provider = await Provider.findById(providerId);
  if (!provider) {
    throw new AppError('Provider not found', 404);
  }

  if (provider.gstStatus !== GST_STATUSES.APPROVED) {
    throw new AppError('GST verification must be approved before posting opportunities', 403);
  }

  const opportunity = await Opportunity.create({
    provider: providerId,
    title: payload.title,
    description: payload.description,
    type: payload.type,
    workMode: payload.workMode,
    location: payload.location,
    skills: payload.skills,
    stipend: payload.stipend,
    duration: payload.duration,
    deadline: payload.deadline,
    seats: payload.seats,
    status: payload.status || 'open',
  });

  await refreshProviderStats(providerId);
  return opportunity;
}

export async function updateOpportunity(providerId, opportunityId, payload) {
  const opportunity = await Opportunity.findOne({ _id: opportunityId, provider: providerId });
  if (!opportunity) {
    throw new AppError('Opportunity not found', 404);
  }

  Object.assign(opportunity, {
    title: payload.title ?? opportunity.title,
    description: payload.description ?? opportunity.description,
    type: payload.type ?? opportunity.type,
    workMode: payload.workMode ?? opportunity.workMode,
    location: payload.location ?? opportunity.location,
    skills: payload.skills ?? opportunity.skills,
    stipend: payload.stipend ?? opportunity.stipend,
    duration: payload.duration ?? opportunity.duration,
    deadline: payload.deadline ?? opportunity.deadline,
    seats: payload.seats ?? opportunity.seats,
    status: payload.status ?? opportunity.status,
  });

  await opportunity.save();
  await refreshProviderStats(providerId);
  return opportunity;
}

export async function deleteOpportunity(providerId, opportunityId) {
  const opportunity = await Opportunity.findOneAndDelete({ _id: opportunityId, provider: providerId });
  if (!opportunity) {
    throw new AppError('Opportunity not found', 404);
  }

  await Application.deleteMany({ opportunity: opportunityId });
  await Task.deleteMany({ opportunity: opportunityId });
  await refreshProviderStats(providerId);
  return opportunity;
}

export async function listProviderOpportunities(providerId) {
  return Opportunity.find({ provider: providerId }).sort({ createdAt: -1 }).lean();
}

export async function applyToOpportunity(userId, opportunityId, payload) {
  const opportunity = await Opportunity.findById(opportunityId);
  if (!opportunity || opportunity.status !== 'open') {
    throw new AppError('Opportunity is not available for applications', 404);
  }

  const existingApplication = await Application.findOne({ user: userId, opportunity: opportunityId });
  if (existingApplication) {
    throw new AppError('You have already applied to this opportunity', 409);
  }

  const application = await Application.create({
    opportunity: opportunity._id,
    provider: opportunity.provider,
    user: userId,
    coverLetter: payload.coverLetter || '',
  });

  opportunity.applicantsCount += 1;
  await opportunity.save();
  await refreshProviderStats(opportunity.provider);

  return application;
}

export async function listProviderApplicants(providerId) {
  return Application.find({ provider: providerId })
    .populate('user', 'name email profile.college profile.skills')
    .populate('opportunity', 'title type')
    .sort({ createdAt: -1 })
    .lean();
}

export async function listUserApplications(userId) {
  return Application.find({ user: userId })
    .populate({
      path: 'opportunity',
      select: 'title type location status deadline',
      populate: { path: 'provider', select: 'companyName' },
    })
    .sort({ createdAt: -1 })
    .lean();
}

export async function decideApplication(providerId, applicationId, status) {
  const application = await Application.findOne({ _id: applicationId, provider: providerId })
    .populate('opportunity')
    .populate('user');

  if (!application) {
    throw new AppError('Application not found', 404);
  }

  application.status = status;
  application.reviewedAt = new Date();
  await application.save();

  if (status === APPLICATION_STATUSES.ACCEPTED) {
    const existingTask = await Task.findOne({
      user: application.user._id,
      opportunity: application.opportunity._id,
    });

    if (!existingTask) {
      await Task.create({
        user: application.user._id,
        provider: providerId,
        opportunity: application.opportunity._id,
        title: application.opportunity.title,
        instructions: `Complete the assigned workflow for ${application.opportunity.title}.`,
        dueDate: application.opportunity.deadline,
      });
    }
  }

  await refreshProviderStats(providerId);
  return application;
}

export async function refreshProviderStats(providerId) {
  const [totalPosts, activePosts, totalApplicants, acceptedApplicants] = await Promise.all([
    Opportunity.countDocuments({ provider: providerId }),
    Opportunity.countDocuments({ provider: providerId, status: 'open' }),
    Application.countDocuments({ provider: providerId }),
    Application.countDocuments({ provider: providerId, status: APPLICATION_STATUSES.ACCEPTED }),
  ]);

  await Provider.findByIdAndUpdate(providerId, {
    $set: {
      'stats.totalPosts': totalPosts,
      'stats.activePosts': activePosts,
      'stats.totalApplicants': totalApplicants,
      'stats.acceptedApplicants': acceptedApplicants,
    },
  });
}
