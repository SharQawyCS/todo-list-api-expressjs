const mongoose = reqiure('mongoose');
const { Schema, Types } = mongoose;

const userSchema = new Schema({
    username: { type: String, reqiured: true, unique: true },
    password: { type: String, reqiured: true, unique: true },
    tasks: { type: Types.ObjectId, ref: 'Task' },
});

module.exports = mongoose.model('User', userSchema);
