import { body } from 'express-validator';

export const updateUserProfileValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('skills').optional().isArray().withMessage('Skills must be an array'),
];

export const updateModeValidator = [body('selectedMode').isIn(['learn', 'earn']).withMessage('Mode must be learn or earn')];

export const applyOpportunityValidator = [body('coverLetter').optional().isString().withMessage('Cover letter must be text')];

export const submitTaskValidator = [body('submissionLink').trim().notEmpty().withMessage('Submission link is required')];
