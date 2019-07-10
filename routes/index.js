//
// This script is used as funnel for every route.
// That way you can remove all that logic from your server file.
//

module.exports = function (app) {
    app.use('/', require('./home'));
    app.use('/api', require('./api'));
    app.use('/users', require('./users'));
    app.use('/quotes', require('./quotes'));
    app.use('/auth', require('./auth'));
};