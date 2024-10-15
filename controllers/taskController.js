const asyncHandler = require('../middlewares/asyncHandler');
const Task = require('../models/Task');
const User = require('../models/User');
const taskService = require('../services/taskService');

//CRUD ops for tasks
const createTask = asyncHandler(async (req, res) => {
    const { title, description, status, priority } = req.body;
    const userId = req.user.userId;

    if (!title) {
        const error = new Error('Title is required!');
        error.statusCode = 400;
        throw error;
    }

    const task = taskService.createTask;

    res.status(201).json({ message: 'Task Created!', task });
});

const getTasks = asyncHandler(async (req, res) => {
    const userId = req.user.userId;

    const tasks = await Task.find({ user: userId });

    res.status(200).json({ message: 'Tasks retrived!', tasks });
});

//todo: return tasks conut
const updateTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const userId = req.user.userId;
    const updatedTask = req.body;

    const task = await Task.findOneAndUpdate(
        { _id: taskId, user: userId },
        updatedTask,
        { new: true }
    );

    if (!task) {
        const error = new Error('Task not found or unauthorized');
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json({ message: 'Task updated successfully!', task });
});

const deleteTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const userId = req.user.userId;
    const task = await Task.findOneAndDelete({ _id: taskId, user: userId });

    if (!task) {
        const error = new Error('Task not found or unauthorized');
        error.statusCode = 404;
        throw error;
    }

    await User.findByIdAndUpdate(userId, { $pull: { tasks: task._id } });

    res.status(200).json({ message: 'Task deleted successfully!', task });
});

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
};
