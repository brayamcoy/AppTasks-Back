const express = require("express");
const router = express.Router();
const {
  getTask,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
} = require("../controllers/tasks");

router.get("/api/v1/tasks", getTask);

router.get("/api/v1/tasks/:id", getTaskById);

router.post("/api/v1/tasks", createTask);

router.put("/api/v1/tasks/:id", updateTaskById);

router.delete("/api/v1/tasks/:id", deleteTaskById);

module.exports = router;
