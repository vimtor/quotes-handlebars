const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

const router = express.Router();

require('../models/User');
const User = mongoose.model('User');

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/quotes/private',
        failureRedirect: '/users/login',
        failureFlash: true
    })
);

module.exports = router;