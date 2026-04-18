import { errorResponse } from '../utils/apiResponse.js';

export function notFound(req, res) {
  return errorResponse(res, `Route ${req.originalUrl} not found`, 404);
}
