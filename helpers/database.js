const mongoose = require('mongoose');
const {mongoTestURI} = require('../config/keys');

module.exports = {
    connect() {
        return mongoose.connect(mongoTestURI, {useNewUrlParser: true})
    },
    disconnect() {
        return mongoose.connection.db.dropDatabase();
    }
};