import {
  getCurrentAccount,
  getSocialProviders,
  getSocialRedirect,
  login,
  registerProvider,
  registerUser,
} from '../services/authService.js';
import { successResponse } from '../utils/apiResponse.js';

export async function registerUserController(req, res) {
  const data = await registerUser(req.body);
  return successResponse(res, data, 'User account created', 201);
}

export async function registerProviderController(req, res) {
  const data = await registerProvider(req.body);
  return successResponse(res, data, 'Provider account created', 201);
}

export async function loginController(req, res) {
  const data = await login(req.body);
  return successResponse(res, data, 'Login successful');
}

export async function meController(req, res) {
  const data = await getCurrentAccount(req.user);
  return successResponse(res, data);
}

export async function socialProvidersController(req, res) {
  const data = await getSocialProviders();
  return successResponse(res, data);
}

export async function socialRedirectController(req, res) {
  const data = await getSocialRedirect(req.params.provider);
  return successResponse(res, data);
}
