// Tasks bussiness logic....
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

const updateTaskById = async (userId, taskId, updatedTaskData) => {
    return await Task.findOneAndUpdate(
        { _id: taskId, user: userId },
        updatedTaskData,
        { new: true }
    );
};

const deleteTaskById = async (userId, taskId) => {
    const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
    if (!task) {
        const error = new Error('Task not found or unauthorized');
        error.statusCode = 404;
        throw error;
    }

    await User.findByIdAndUpdate(userId, { $pull: { tasks: task._id } });
};

module.exports = {
    createTask,
    getUserTasks,
    updateTaskById,
    deleteTaskById,
};
