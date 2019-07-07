//
// This script is used as funnel for every passport strategy.
// It also configures the serialize functions for the session.
// That way you can remove all that logic from your server file.
//

module.exports = function (passport) {
    require('./serialize')(passport);
    require('./google')(passport);
    require('./github')(passport);
    require('./local')(passport);
};