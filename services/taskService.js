const Task = require('../models/Task');
const User = require('../models/User');

const createTask = async (userId, taskData) => {
    const task = await Task.create({ ...taskData, user: userId });
    await User.findByIdAndUpdate(userId, { $push: { tasks: task._id } });
    return task;
};

const getUserTasks = async (userId) => {
    return await Task.find({ user: userId });
};

module.exports = {
    createTask,
    getUserTasks,
};
