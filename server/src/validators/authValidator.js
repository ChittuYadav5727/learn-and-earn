import { body } from 'express-validator';

export const registerUserValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('selectedMode').optional().isIn(['learn', 'earn']),
];

export const registerProviderValidator = [
  body('companyName').trim().notEmpty().withMessage('Company name is required'),
  body('companyEmail').isEmail().withMessage('Valid company email is required'),
  body('industry').trim().notEmpty().withMessage('Industry is required'),
  body('email').isEmail().withMessage('Valid admin email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

export const loginValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  body('role').optional().isIn(['user', 'provider', 'admin', 'auto']).withMessage('Valid role is required'),
];
