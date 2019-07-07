const GithubStrategy = require('passport-github2').Strategy;
const mongoose = require('mongoose');

require('../../models/User');
const User = mongoose.model('User');

const {githubClientID, githubClientSecret, githubURI} = require('../keys');

module.exports = function (passport) {
    passport.use(new GithubStrategy({
        clientID: githubClientID,
        clientSecret: githubClientSecret,
        callbackURL: githubURI
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({githubId: profile.id})
            .then(user => {
                // Check if user already exists
                if (user) {
                    return done(null, user);
                }

                // Create user if he doesn't exist
                new User({
                    githubId: profile.id
                }).save()
                    .then(user => done(null, user))
                    .catch(err => done(err));
            })
            .catch(err => done(err));
    }))
};