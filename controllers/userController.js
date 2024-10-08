const User = require('../models/User');
const Task = require('../models/Task');
const bcrypt = require('bcrypt');

const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.userId;
        const user = await User.findById(userId);

        if (!user) {
            res.status(404).json({ message: 'user not found or auth error' });
        }

        const userCurrentPassword = user.password;

        const isMatch = await bcrypt.compare(
            currentPassword,
            userCurrentPassword
        );

        if (!isMatch) {
            res.status.json({
                message: 'entered password is not match old password',
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ message: 'password updated!' });
    } catch (err) {
        res.status(500).json({ message: 'Error: password not updated!', err });
    }
};

/**
 * token, password
 * check pass
 * delete the tasks
 * delete the acc
 */
const deleteAccount = async (req, res) => {
    try {
        const { password } = req.body;
        const userId = req.user.userId;
        const user = await User.findById(userId).select('password tasks');

        //todo: to model
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(500).json({
                message: 'entered password is not match old password',
            });
        }

        //todo: to model
        const tasks = user.tasks;
        const isTasksDeleted = await Task.deleteMany({ _id: { $in: tasks } });
        if (!isTasksDeleted.acknowledged) {
            return res.status(500).json({ message: 'tasks is not deleted' });
        }

        const isUserDeleted = await user.deleteOne();
        if (!isUserDeleted.acknowledged) {
            return res.status(500).json({ message: 'user is not deleted' });
        }

        return res.status(200).json({ message: 'user deleted!' });
    } catch (err) {
        return res.status(500).json({ message: 'user is not deleted', err });
    }
};
module.exports = { changePassword, deleteAccount };
