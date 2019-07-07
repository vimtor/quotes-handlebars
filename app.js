const express = require('express');
require('express-async-errors');

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

// Setup passport strategies
require('./config/passport')(passport);

// Global Variables
require('./config/globals')(app);

// Basic Routing
require('./routes')(app);

// Error Handling
require('./helpers/errors')(app);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server started on port:', PORT);

    if (process.env.NODE_ENV !== 'production') {
        console.log('http://localhost:5000/');
    }
});