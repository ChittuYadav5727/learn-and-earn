import { errorResponse } from '../utils/apiResponse.js';

export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return errorResponse(res, 'You do not have access to this resource', 403);
    }
    return next();
  };
}
