const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');

const router = express.Router();

const {ensureAutheticated} = require('../helpers/auth');

require('../models/User');
const User = mongoose.model('User');

router.get('/login', (req, res) => {
    res.render('users/login.hbs');
});

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/quotes/private',
        failureRedirect: '/users/login',
        failureFlash: true
    })
);

router.get('/register', (req, res) => {
    res.render('users/register.hbs');
});

router.post('/register', async (req, res) => {
    // Check if passwords match.
    if (req.body.password !== req.body.confirmPassword) {
        req.flash('error', 'Passwords do not match.');
        return res.redirect('/users/register');
    }

    const user = await User.findOne({email: req.body.email});

    // Check if user already exists.
    if (user) {
        req.flash('error', 'That user is already registered.');
        return res.redirect('/users/register');
    }

    // Encrypt password.
    const hash = await bcrypt.hash(req.body.password, 10);

    // Insert new user to the database.
    await new User({
        email: req.body.email,
        password: hash
    }).save();

    req.flash('success', 'Registered successfully!');
    res.redirect('/users/register');
});

router.get('/logout', ensureAutheticated, (req, res) => {
    req.logout();

    req.flash('success', 'See you soon!');
    res.redirect('/users/login');
});

router.delete('/', ensureAutheticated, async (req, res) => {
    const user = await User.findById(req.user.id);
    await user.delete();

    req.flash('success', 'Hope you comeback someday!')
    res.redirect('/quotes/public');
});


module.exports = router;