import { body } from 'express-validator';

export const submitCertificationValidator = [body('answers').isArray({ min: 1 }).withMessage('Answers are required')];
