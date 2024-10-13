const asyncHandler = require('../middlewares/asyncHandler');
const Task = require('../models/Task');
const User = require('../models/User');

//CRUD ops for tasks

const createTask = asyncHandler(async (req, res) => {
    const { title, description, status, priority } = req.body;
    const userId = req.user.userId;

    if (!title) {
        const error = new Error('Title is required!');
        error.statusCode = 400;
        throw error;
    }

    const task = await Task.create({
        title,
        description,
        status,
        user: userId,
        priority,
    });
    await User.findByIdAndUpdate(userId, { $push: { tasks: task._id } });

    res.status(201).json({ message: 'Task Created!', task });
});

const getTasks = async (req, res) => {
    try {
        const userId = req.user.userId;

        const tasks = await Task.find({ user: userId });

        res.status(200).json({ message: 'Tasks retrived!', tasks });
    } catch (err) {
        res.status(500).json({ message: 'Faild to retrive tasks' });
    }
};

const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const userId = req.user.userId;
        const updatedTask = req.body;

        const task = await Task.findOneAndUpdate(
            { _id: taskId, user: userId },
            updatedTask,
            { new: true }
        );

        console.log({ taskId, userId, updatedTask, task });

        if (!task) {
            return res
                .status(404)
                .json({ message: 'Task not found or unauthorized' });
        }

        res.status(200).json({ message: 'task updated!', task });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update task', err });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const userId = req.user.userId;

        const task = await Task.findOneAndDelete({ _id: taskId, user: userId });

        if (!task) {
            return res
                .status(404)
                .json({ message: 'Task not found or unauthorized' });
        }

        User.findByIdAndUpdate(userId, { $pull: { tasks: task._id } });

        res.status(200).json({ message: 'task deleted!', task });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete task', err });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
};
