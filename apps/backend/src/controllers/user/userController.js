import { listCompetitions, joinCompetition } from '../../services/competitionService.js';
import { getCertificationExam, listCertificationHistory, submitCertificationExam } from '../../services/certificationService.js';
import { applyToOpportunity, listOpenOpportunities, listUserApplications } from '../../services/opportunityService.js';
import { listUserTasks, submitTask } from '../../services/taskService.js';
import {
  getLeaderboard,
  getLearnEarnFeed,
  getUserActivity,
  getUserDashboard,
  getUserProfile,
  updateUserMode,
  updateUserProfile,
} from '../../services/userService.js';
import { getWalletByUser } from '../../services/walletService.js';
import { successResponse } from '../../utils/apiResponse.js';

export async function getDashboardController(req, res) {
  const data = await getUserDashboard(req.user.id);
  return successResponse(res, data);
}

export async function getProfileController(req, res) {
  const [profile, activity] = await Promise.all([getUserProfile(req.user.id), getUserActivity(req.user.id)]);
  return successResponse(res, { profile, activity });
}

export async function updateProfileController(req, res) {
  const data = await updateUserProfile(req.user.id, req.body);
  return successResponse(res, data, 'Profile updated');
}

export async function updateModeController(req, res) {
  const data = await updateUserMode(req.user.id, req.body.selectedMode);
  return successResponse(res, data, 'Mode updated');
}

export async function getLearnEarnController(req, res) {
  const mode = req.query.mode === 'earn' ? 'earn' : 'learn';
  const data = await getLearnEarnFeed(mode);
  return successResponse(res, data);
}

export async function getInternshipsController(req, res) {
  const data = await listOpenOpportunities({ type: req.query.type || 'internship' });
  return successResponse(res, data);
}

export async function applyOpportunityController(req, res) {
  const data = await applyToOpportunity(req.user.id, req.params.opportunityId, req.body);
  return successResponse(res, data, 'Application submitted', 201);
}

export async function getApplicationsController(req, res) {
  const data = await listUserApplications(req.user.id);
  return successResponse(res, data);
}

export async function getCompetitionsController(req, res) {
  const data = await listCompetitions();
  return successResponse(res, data);
}

export async function joinCompetitionController(req, res) {
  const data = await joinCompetition(req.user.id, req.params.competitionId);
  return successResponse(res, data, 'Competition joined');
}

export async function getLeaderboardController(req, res) {
  const data = await getLeaderboard();
  return successResponse(res, data);
}

export async function getWalletController(req, res) {
  const data = await getWalletByUser(req.user.id);
  return successResponse(res, data);
}

export async function getTasksController(req, res) {
  const data = await listUserTasks(req.user.id);
  return successResponse(res, data);
}

export async function submitTaskController(req, res) {
  const data = await submitTask(req.user.id, req.params.taskId, req.body.submissionLink);
  return successResponse(res, data, 'Task submitted');
}

export async function getCertificationExamController(req, res) {
  const data = getCertificationExam();
  return successResponse(res, data);
}

export async function submitCertificationController(req, res) {
  const data = await submitCertificationExam(req.user.id, req.body.answers);
  return successResponse(res, data, data.isCertified ? 'Certificate awarded' : 'Assessment completed');
}

export async function getCertificationHistoryController(req, res) {
  const data = await listCertificationHistory(req.user.id);
  return successResponse(res, data);
}
