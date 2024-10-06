const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true, unique: true },
        tasks: { type: Types.ObjectId, ref: 'Task' },
    },
    { timeStamps: true }
);

module.exports = mongoose.model('User', userSchema);
