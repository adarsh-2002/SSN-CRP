import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 1232
        },
        Admin: Number,
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
});
const User  = mongoose.model('User', userSchema);

export default User;
