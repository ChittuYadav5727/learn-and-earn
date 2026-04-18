import { validationResult } from 'express-validator';
import { errorResponse } from '../utils/apiResponse.js';

export function validate(req, res, next) {
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    return next();
  }

  return errorResponse(res, 'Validation failed', 422, validationErrors.array());
}
