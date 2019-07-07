const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

require('../../models/User');
const User = mongoose.model('User');

const {googleClientID, googleClientSecret} = require('../keys');

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        // Create or find existing user.
        User.findOne({googleId: profile.id})
            .then(user => {
                // Check if user already exists.
                if (user) {
                    return done(null, user);
                }

                // Create new user if doesn't exist.
                new User({
                    email: profile.emails[0].value,
                    googleId: profile.id
                }).save()
                    .then(user => done(null, user))
                    .catch(err => done(err));
            })
            .catch(err => done(err));
    }));
};
