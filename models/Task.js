const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const taskSchema = new Schema(
    {
        title: { type: String, required: [true, 'Title is required!'] },
        description: { type: String },
        status: {
            type: String,
            enum: ['not-started', 'in-progress', 'done'],
            default: 'not-started',
        },
        user: { type: Types.ObjectId, ref: 'User' },
        priority: {
            type: String,
            enum: ['not-set', 'high', 'mid', 'low'],
            default: 'not-set',
        },
        dueDate: Date, //todo:
    },
    { timestamps: true }
);

//Task services:

module.exports = mongoose.model('Task', taskSchema);
