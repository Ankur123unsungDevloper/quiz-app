const express = require('express');
const { body, validationResult } = require('express-validator');
const { getQuizzes, createQuiz, getQuizById } = require('../controllers/quizController');
const router = express.Router();

router.route('/')
  .get(getQuizzes)
  .post(
    [
      body('title').notEmpty().withMessage('Title is required'),
      body('questions').isArray().withMessage('Questions must be an array'),
      body('questions.*.question').notEmpty().withMessage('Question text is required'),
      body('questions.*.options').isArray().withMessage('Options must be an array'),
      body('questions.*.options.*').notEmpty().withMessage('Each option must not be empty'),
      body('questions.*.answer').notEmpty().withMessage('Answer is required'),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      createQuiz(req, res);
    }
  );

router.route('/:id').get(getQuizById);

module.exports = router;