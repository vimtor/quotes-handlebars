module.exports = {
    sessionSecret: process.env.SESSION_SECRET,
    mongoURI: process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : 'mongodb://localhost/quotes-dev'
};