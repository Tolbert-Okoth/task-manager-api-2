const Task = require('../models/Task');

// @desc    Get all tasks for the logged-in user
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.userId });
    res.status(200).json({ count: tasks.length, tasks });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const task = await Task.create({
      title,
      description,
      createdBy: req.user.userId,
    });

    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Get a single task by ID
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Update a task by ID
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found or not authorized' });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Delete a task by ID
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found or not authorized' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
