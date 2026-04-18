import { getProviderVerification, submitGstVerification } from '../../services/gstService.js';
import {
  createOpportunity,
  decideApplication,
  deleteOpportunity,
  listProviderApplicants,
  listProviderOpportunities,
  updateOpportunity,
} from '../../services/opportunityService.js';
import { getProviderDashboard, getProviderProfile, updateProviderProfile } from '../../services/providerService.js';
import { successResponse } from '../../utils/apiResponse.js';

export async function getProviderDashboardController(req, res) {
  const data = await getProviderDashboard(req.user.id);
  return successResponse(res, data);
}

export async function getProviderProfileController(req, res) {
  const data = await getProviderProfile(req.user.id);
  return successResponse(res, data);
}

export async function updateProviderProfileController(req, res) {
  const data = await updateProviderProfile(req.user.id, req.body);
  return successResponse(res, data, 'Company profile updated');
}

export async function getGstController(req, res) {
  const data = await getProviderVerification(req.user.id);
  return successResponse(res, data);
}

export async function submitGstController(req, res) {
  const data = await submitGstVerification(req.user.id, req.body);
  return successResponse(res, data, 'GST details submitted');
}

export async function createOpportunityController(req, res) {
  const data = await createOpportunity(req.user.id, req.body);
  return successResponse(res, data, 'Opportunity posted', 201);
}

export async function listProviderOpportunitiesController(req, res) {
  const data = await listProviderOpportunities(req.user.id);
  return successResponse(res, data);
}

export async function updateOpportunityController(req, res) {
  const data = await updateOpportunity(req.user.id, req.params.opportunityId, req.body);
  return successResponse(res, data, 'Opportunity updated');
}

export async function deleteOpportunityController(req, res) {
  const data = await deleteOpportunity(req.user.id, req.params.opportunityId);
  return successResponse(res, data, 'Opportunity deleted');
}

export async function getApplicantsController(req, res) {
  const data = await listProviderApplicants(req.user.id);
  return successResponse(res, data);
}

export async function updateApplicantStatusController(req, res) {
  const data = await decideApplication(req.user.id, req.params.applicationId, req.body.status);
  return successResponse(res, data, 'Application updated');
}
