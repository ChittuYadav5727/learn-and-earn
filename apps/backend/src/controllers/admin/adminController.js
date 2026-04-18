import { listPendingGstRequests, reviewGstVerification } from '../../services/adminService.js';
import { successResponse } from '../../utils/apiResponse.js';

export async function listPendingGstController(req, res) {
  const data = await listPendingGstRequests();
  return successResponse(res, data);
}

export async function reviewGstController(req, res) {
  const data = await reviewGstVerification(req.params.verificationId, req.body.status, req.body.rejectionReason);
  return successResponse(res, data, 'GST review completed');
}
