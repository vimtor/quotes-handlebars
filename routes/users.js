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
    // TODO: Use flask and check if passwords match.

    // Check if user already exists.
    User.findOne({email: req.body.email}).then(user => {
        if (user) {
            // TODO: Use flask to display an error.
            res.render('users/register.hbs')
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
                    // TODO: Use flask to display success message.
                    console.log(`User with id: ${user.id}. Was added successfully.`);
                    res.render('users/register.hbs');
                })
                .catch(err => console.log(err));
        });
    });
});


module.exports = router;