const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const router = express.Router();

require('../models/User');
const User = mongoose.model('User');

router.get('/login', (req, res) => {
    res.render('users/login.hbs');
});

router.get('/register', (req, res) => {
    res.render('users/register.hbs');
});

router.post('/register', (req, res) => {
    // Check if passwords match.
    if (req.body.password !== req.body.confirmPassword) {
        req.flash('error', 'Passwords do not match.');
        return res.redirect('/users/register');
    }

    // Check if user already exists.
    User.findOne({email: req.body.email}).then(user => {
        if (user) {
            req.flash('error', 'That user is already registered.');
            return res.redirect('/users/register');
        }

        // Encrypt password.
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) throw err;

            const newUser = {
                email: req.body.email,
                password: hash
            };

            // Insert new user to the database.
            new User(newUser).save()
                .then(user => {
                    req.flash('success', 'Registered successfully!');
                    res.redirect('/users/register');
                })
                .catch(err => console.log(err));
        });
    });
});


module.exports = router;