import { body } from 'express-validator';

export const submitGstValidator = [
  body('gstNumber').trim().isLength({ min: 15, max: 15 }).withMessage('GST number must be 15 characters'),
  body('legalCompanyName').trim().notEmpty().withMessage('Legal company name is required'),
  body('registeredAddress').trim().notEmpty().withMessage('Registered address is required'),
];

export const reviewGstValidator = [
  body('status').isIn(['approved', 'rejected']).withMessage('Status must be approved or rejected'),
  body('rejectionReason').optional().isString(),
];
