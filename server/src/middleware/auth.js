import { Admin } from '../models/Admin.js';
import { Provider } from '../models/Provider.js';
import { User } from '../models/User.js';
import { errorResponse } from '../utils/apiResponse.js';
import { verifyToken } from '../utils/jwt.js';

export async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : null;

  if (!token) {
    return errorResponse(res, 'Authentication required', 401);
  }

  try {
    const payload = verifyToken(token);
    const account =
      payload.role === 'provider'
        ? await Provider.findById(payload.id)
        : payload.role === 'admin'
          ? await Admin.findById(payload.id)
          : await User.findById(payload.id);

    if (!account) {
      return errorResponse(res, 'Account not found', 401);
    }

    req.user = {
      id: account._id.toString(),
      role: payload.role,
      email: account.email,
    };

    req.account = account;
    return next();
  } catch (error) {
    return errorResponse(res, 'Invalid or expired token', 401);
  }
}
