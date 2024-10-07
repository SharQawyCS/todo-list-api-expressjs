const User = require('../models/User');
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

module.exports = { changePassword };
