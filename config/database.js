module.exports = function (mongoose) {
    const mongoURI = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : 'mongodb://localhost/quotes-dev';

    mongoose.connect(mongoURI, {useNewUrlParser: true})
        .then(() => console.log('MongoDB is connected.'))
        .catch(err => console.log(err));
};