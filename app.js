const express = require('express');
require('express-async-errors');
const passport = require('passport');

const app = express();

// Get private variables.
require('dotenv').config();

// Setup Middlewares
require('./config/middlewares')(app);

// Setup passport strategies
require('./config/passport')(passport);

// Global Variables
require('./config/globals')(app);

// Basic Routing
require('./routes')(app);

// Error Handling
require('./helpers/errors')(app);

module.exports = app;