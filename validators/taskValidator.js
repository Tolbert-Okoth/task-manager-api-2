// validators/taskValidator.js
const { body } = require('express-validator');

const createTaskValidator = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),

  body('description')
    .optional()
    .isLength({ max: 200 }).withMessage('Description must be under 200 characters'),
];

const updateTaskValidator = [
  body('title')
    .optional()
    .isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),

  body('description')
    .optional()
    .isLength({ max: 200 }).withMessage('Description must be under 200 characters'),
];

module.exports = {
  createTaskValidator,
  updateTaskValidator
};
