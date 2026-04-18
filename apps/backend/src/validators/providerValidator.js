import { body } from 'express-validator';

export const updateProviderProfileValidator = [
  body('companyName').trim().notEmpty().withMessage('Company name is required'),
  body('companyEmail').isEmail().withMessage('Company email is required'),
  body('industry').trim().notEmpty().withMessage('Industry is required'),
];
