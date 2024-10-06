const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to the database');
    } catch (err) {
        console.log('Error connecting to the database', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
