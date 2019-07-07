module.exports = function (app) {
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success');
        res.locals.error_msg = req.flash('error');
        res.locals.user = req.user || null;
        res.locals.url = req.originalUrl;

        next();
    });
};