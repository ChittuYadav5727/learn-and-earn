import { Router } from 'express';
import { listPendingGstController, reviewGstController } from '../controllers/admin/adminController.js';
import { ROLES } from '../constants/roles.js';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { requireRole } from '../middleware/requireRole.js';
import { validate } from '../middleware/validate.js';
import { reviewGstValidator } from '../validators/gstValidator.js';

const router = Router();

router.use(authenticate, requireRole(ROLES.ADMIN));
router.get('/gst/pending', asyncHandler(listPendingGstController));
router.patch('/gst/:verificationId', reviewGstValidator, validate, asyncHandler(reviewGstController));

export default router;
