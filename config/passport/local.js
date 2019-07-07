const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

require('../../models/User');
const User = mongoose.model('User');

// Bind new Local Strategy.
module.exports = function (passport) {
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        User.findOne({email}).then(user => {
            // Check if user exists.
            if (!user) {
                return done(null, false, {message: 'That users does not exist.'});
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return done(err);
                }

                // Check if passwords match.
                if (!isMatch) {
                    return done(null, false, {message: 'Incorrect Password'});
                }

                return done(null, user);
            });
        })
    }));
};