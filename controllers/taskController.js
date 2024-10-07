const Task = require('../models/Task');
const User = require('../models/User');

//CRUD ops for tasks

const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        const userId = req.user.userId;

        const task = await Task.create({
            title,
            description,
            status,
            user: userId,
        });

        await User.findByIdAndUpdate(userId, { $push: { tasks: task._id } });

        res.status(201).json({ message: 'Task Created!' });
    } catch (err) {
        res.status(500).json({ message: 'Faild: Task Not Created!' });
    }
};

const getTasks = async (req, res) => {
    /**
     * Get all tasks for specific user
     * take tha id
     * if exists, send it, if not, do not care
     */
    try {
        const userId = req.user.userId;
        const tasks = await Task.find({ user: userId });

        res.status(200).json({ message: 'Tasks retrived!', tasks });
    } catch (err) {
        res.status(500).json({ message: 'Faild to retrive tasks' });
    }
};

const updataTask = async (req, res) => {};

const deleteTask = async (req, res) => {};

module.exports = {
    createTask,
    getTasks,
    updataTask,
    deleteTask,
};
