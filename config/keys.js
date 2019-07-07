module.exports = {
    sessionSecret: process.env.SESSION_SECRET,
    mongoURI: process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : 'mongodb://localhost/quotes-dev',
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    githubClientID: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET
};