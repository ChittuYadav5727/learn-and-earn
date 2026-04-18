import { Router } from 'express';
import {
  loginController,
  meController,
  registerProviderController,
  registerUserController,
  socialProvidersController,
  socialRedirectController,
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { validate } from '../middleware/validate.js';
import { loginValidator, registerProviderValidator, registerUserValidator } from '../validators/authValidator.js';

const router = Router();

router.post('/user/register', registerUserValidator, validate, asyncHandler(registerUserController));
router.post('/provider/register', registerProviderValidator, validate, asyncHandler(registerProviderController));
router.post('/login', loginValidator, validate, asyncHandler(loginController));
router.get('/me', authenticate, asyncHandler(meController));
router.get('/social/providers', asyncHandler(socialProvidersController));
router.get('/social/:provider', asyncHandler(socialRedirectController));

export default router;
