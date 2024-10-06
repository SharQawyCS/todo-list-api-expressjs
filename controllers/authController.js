const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jwt');

//Register User
const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = bcrypt.hash(password, 10);

        await User.create({ username, password: hashedPassword });

        res.status(201).json({ message: 'User Registerd!' });
    } catch (err) {
        res.status(500).json({ message: 'error registering user', err });
    }
};

//Login User
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }

        const isPassMatch = await bcrypt.compare(password, user.password);
        if (!isPassMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        //todo: (WHY???) Create a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};
module.exports = { registerUser, loginUser };
