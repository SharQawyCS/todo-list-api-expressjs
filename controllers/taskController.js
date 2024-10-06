const Task = require('../models/Task');
const User = require('../models/User');

//CRUD ops for tasks

const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        const userId = req.user.userId;
        console.log(req.user);

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

const getTask = async (req, res) => {};

const updataTask = async (req, res) => {};

const deleteTask = async (req, res) => {};

module.exports = {
    createTask,
    getTask,
    updataTask,
    deleteTask,
};
