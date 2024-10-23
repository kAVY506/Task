const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// GET /tasks - Fetch all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// POST /tasks - Add a new task
router.post('/', async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const newTask = new Task({ title, description });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// DELETE /tasks/:id
router.delete('/:id', async (req, res) => {
  try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) {
          return res.status(404).json({ message: 'Task not found' });
      }
      res.json({ message: 'Task deleted' });
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;