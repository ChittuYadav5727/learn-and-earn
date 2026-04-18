import { Router } from 'express';
import { getCatalog, getHome, getVideos, postChatMessage } from '../controllers/public/publicController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { validate } from '../middleware/validate.js';
import { chatbotValidator } from '../validators/publicValidator.js';

const router = Router();

router.get('/home', asyncHandler(getHome));
router.get('/catalog', asyncHandler(getCatalog));
router.get('/videos', asyncHandler(getVideos));
router.post('/chat', chatbotValidator, validate, asyncHandler(postChatMessage));

export default router;
