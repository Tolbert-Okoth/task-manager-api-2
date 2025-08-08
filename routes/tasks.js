const express = require('express');


const router = express.Router();
const {
  getAllTasks,
  getTask, // match function name in controller
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const validateTask = require('../middleware/validateTask');

// All task routes are protected
router.use(authMiddleware);

// GET all tasks
router.get('/', getAllTasks);

// GET task by ID
router.get('/:id', getTask);

// CREATE a task
router.post('/', validateTask, createTask);

// UPDATE a task
router.put('/:id', validateTask, updateTask);

// DELETE a task
router.delete('/:id', deleteTask);

module.exports = router;
