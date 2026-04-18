import { body } from 'express-validator';

export const createOpportunityValidator = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('type').isIn(['internship', 'job', 'freelance', 'competition']).withMessage('Invalid opportunity type'),
  body('workMode').optional().isIn(['remote', 'onsite', 'hybrid']),
  body('deadline').isISO8601().withMessage('Deadline must be a valid date'),
  body('skills').optional().isArray().withMessage('Skills must be an array'),
  body('seats').optional().isInt({ min: 1 }).withMessage('Seats must be at least 1'),
];

export const updateOpportunityValidator = [
  body('title').optional().trim().notEmpty(),
  body('description').optional().trim().notEmpty(),
  body('type').optional().isIn(['internship', 'job', 'freelance', 'competition']),
  body('workMode').optional().isIn(['remote', 'onsite', 'hybrid']),
  body('deadline').optional().isISO8601(),
  body('skills').optional().isArray(),
  body('status').optional().isIn(['draft', 'open', 'closed']),
];

export const applicationDecisionValidator = [
  body('status').isIn(['accepted', 'rejected', 'reviewing']).withMessage('Invalid application status'),
];
