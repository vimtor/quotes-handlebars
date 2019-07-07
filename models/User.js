const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
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
    }
});

mongoose.model('User', userSchema);