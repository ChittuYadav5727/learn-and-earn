import { body } from 'express-validator';

export const chatbotValidator = [
  body('message').optional().isString().trim().isLength({ min: 1, max: 240 }).withMessage('Message must be between 1 and 240 characters'),
  body('action')
    .optional()
    .isIn(['browse-courses', 'how-to-earn', 'help', 'roadmap', 'rewards'])
    .withMessage('Unsupported quick action'),
];
