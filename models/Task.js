const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const taskSchema = new Schema(
    {
        title: { type: String, required: true },
        description: String,
        status: {
            type: String,
            enum: ['not-started', 'in-progress', 'done'],
            default: 'not-started',
        },
        dueDate: Date, //todo
        user: { type: Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
