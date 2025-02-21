const express = require("express");
const router = express.Router();
const { readTasks, writeTasks } = require("../utils/taskUtils");

// Get all tasks
router.get("/", (req, res, next) => {
    try {
        const tasks = readTasks();
        res.json(tasks);
    } catch (error) {
        next(error);
    }
});

// Create a new task
router.post("/", (req, res, next) => {
    try {
        const { title } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({ error: "Task title is required." });
        }

        const tasks = readTasks();
        const newTask = {
            id: Date.now(),
            title: title.trim(),
            completed: false,
        };

        tasks.push(newTask);
        writeTasks(tasks);
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
});

// Delete a task
router.delete("/:id", (req, res, next) => {
    try {
        const taskId = parseInt(req.params.id);
        const tasks = readTasks();
        const updatedTasks = tasks.filter((task) => task.id !== taskId);

        if (tasks.length === updatedTasks.length) {
            return res.status(404).json({ error: "Task not found." });
        }

        writeTasks(updatedTasks);
        res.status(200).json({ message: "Task deleted successfully." });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
