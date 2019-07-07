const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const exphbs = require('express-handlebars');
const back = require('express-back');
const passport = require('passport');
const favicon = require('serve-favicon');
const path = require('path');
const methodOverride = require('method-override');

const keys = require('./keys');

module.exports = function (app) {
    // Handlebars Middleware
    app.engine('.hbs', exphbs({
        extname: '.hbs',
        helpers: require('../helpers/hbs')
    }));
    app.set('views engine', '.hbs');

    // Custom HTTP request
    app.use(methodOverride('_method'));

    // Express Middleware.
    app.use(express.static('public'));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    // Express Session Middleware.
    app.use(session({
        secret: keys.sessionSecret,
        resave: true,
        saveUninitialized: true
    }));

    // Flash Middleware
    app.use(flash());

    // Express Back Middleware
    app.use(back());

    // Express Favicon
    app.use(favicon(path.join('public', 'favicon.ico')));

    // Passport Middleware
    app.use(passport.initialize());
    app.use(passport.session());

};