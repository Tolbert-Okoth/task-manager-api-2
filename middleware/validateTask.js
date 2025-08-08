const { body, validationResult } = require('express-validator');

// Validation rules for creating/updating a task
const validateTask = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title must be at most 100 characters'),

  body('description')
    .optional()
    .isLength({ max: 500 }).withMessage('Description must be at most 500 characters'),

  // This middleware runs after validation rules
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateTask;
