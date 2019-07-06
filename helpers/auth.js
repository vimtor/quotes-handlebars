module.exports = {
    ensureAutheticated(req, res, next) {
        if (!req.isAuthenticated()) {
            req.flash('error', 'Not authorized');
            return res.redirect('/');
        }

        next();
    }
};