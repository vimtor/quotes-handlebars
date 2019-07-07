const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
    },
    password: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    googleId: {
        type: String
    },
    githubId: {
        type: String
    }
});

mongoose.model('User', userSchema);