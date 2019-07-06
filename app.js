const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

// Get private variables.
require('dotenv').config();
const keys = require('./config/keys');

// Setup Middlewares
require('./config/middlewares')(app);

// Connect to MongoDB
mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
    .then(() => console.log('MongoDB is connected.'))
    .catch(err => console.log(err));

// Setup passport strategy
require('./config/passport')(passport);

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success');
    res.locals.error_msg = req.flash('error');
    res.locals.user = req.user || null;

    next();
});

// Basic Routing
require('./routes')(app);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server started on port:', PORT);

    if (process.env.NODE_ENV !== 'production') {
        console.log('http://localhost:5000/');
    }
});