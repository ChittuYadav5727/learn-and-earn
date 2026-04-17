import { Router } from 'express';
import {
  createOpportunityController,
  deleteOpportunityController,
  getApplicantsController,
  getGstController,
  getProviderDashboardController,
  getProviderProfileController,
  listProviderOpportunitiesController,
  submitGstController,
  updateApplicantStatusController,
  updateOpportunityController,
  updateProviderProfileController,
} from '../controllers/provider/providerController.js';
import { ROLES } from '../constants/roles.js';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { requireRole } from '../middleware/requireRole.js';
import { validate } from '../middleware/validate.js';
import { submitGstValidator } from '../validators/gstValidator.js';
import { applicationDecisionValidator, createOpportunityValidator, updateOpportunityValidator } from '../validators/opportunityValidator.js';
import { updateProviderProfileValidator } from '../validators/providerValidator.js';

const router = Router();

router.use(authenticate, requireRole(ROLES.PROVIDER));

router.get('/dashboard', asyncHandler(getProviderDashboardController));
router.get('/profile', asyncHandler(getProviderProfileController));
router.put('/profile', updateProviderProfileValidator, validate, asyncHandler(updateProviderProfileController));
router.get('/gst', asyncHandler(getGstController));
router.post('/gst', submitGstValidator, validate, asyncHandler(submitGstController));
router.get('/opportunities', asyncHandler(listProviderOpportunitiesController));
router.post('/opportunities', createOpportunityValidator, validate, asyncHandler(createOpportunityController));
router.patch('/opportunities/:opportunityId', updateOpportunityValidator, validate, asyncHandler(updateOpportunityController));
router.delete('/opportunities/:opportunityId', asyncHandler(deleteOpportunityController));
router.get('/applicants', asyncHandler(getApplicantsController));
router.patch('/applications/:applicationId/status', applicationDecisionValidator, validate, asyncHandler(updateApplicantStatusController));

export default router;
