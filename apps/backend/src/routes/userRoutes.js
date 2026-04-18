import { Router } from 'express';
import {
  applyOpportunityController,
  getApplicationsController,
  getCertificationExamController,
  getCertificationHistoryController,
  getCompetitionsController,
  getDashboardController,
  getInternshipsController,
  getLeaderboardController,
  getLearnEarnController,
  getProfileController,
  getTasksController,
  getWalletController,
  joinCompetitionController,
  submitCertificationController,
  submitTaskController,
  updateModeController,
  updateProfileController,
} from '../controllers/user/userController.js';
import { ROLES } from '../constants/roles.js';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { requireRole } from '../middleware/requireRole.js';
import { validate } from '../middleware/validate.js';
import { submitCertificationValidator } from '../validators/certificationValidator.js';
import { applyOpportunityValidator, submitTaskValidator, updateModeValidator, updateUserProfileValidator } from '../validators/userValidator.js';

const router = Router();

router.use(authenticate, requireRole(ROLES.USER));

router.get('/dashboard', asyncHandler(getDashboardController));
router.get('/profile', asyncHandler(getProfileController));
router.put('/profile', updateUserProfileValidator, validate, asyncHandler(updateProfileController));
router.patch('/mode', updateModeValidator, validate, asyncHandler(updateModeController));
router.get('/learn-earn', asyncHandler(getLearnEarnController));
router.get('/internships', asyncHandler(getInternshipsController));
router.post('/opportunities/:opportunityId/apply', applyOpportunityValidator, validate, asyncHandler(applyOpportunityController));
router.get('/applications', asyncHandler(getApplicationsController));
router.get('/competitions', asyncHandler(getCompetitionsController));
router.post('/competitions/:competitionId/join', asyncHandler(joinCompetitionController));
router.get('/leaderboard', asyncHandler(getLeaderboardController));
router.get('/wallet', asyncHandler(getWalletController));
router.get('/tasks', asyncHandler(getTasksController));
router.patch('/tasks/:taskId/submit', submitTaskValidator, validate, asyncHandler(submitTaskController));
router.get('/certification/exam', asyncHandler(getCertificationExamController));
router.post('/certification/submit', submitCertificationValidator, validate, asyncHandler(submitCertificationController));
router.get('/certification/history', asyncHandler(getCertificationHistoryController));

export default router;
