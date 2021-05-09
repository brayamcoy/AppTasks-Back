const { Tasks } = require("../models/Tasks");

const createTask = async (req, res) => {
  const { content } = req.body;

  const task = new Tasks({
    content,
    date: new Date(),
    is_completed: false,
  });

  await task.save();

  res.json({ message: "Task added successfully", task });
};

const getTask = async (req, res) => {
  try {
    const task = await Tasks.find();
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: "Failed to display tasks" });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Tasks.findById(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: "The task has not been found" });
  }
};

const updateTaskById = async (req, res) => {
  try {
    const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: "Failed to update task" });
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const task = await Tasks.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ message: "Error deleting task" });
  }
};

module.exports = {
  deleteTaskById,
  createTask,
  updateTaskById,
  getTask,
  getTaskById,
};
