module.exports = function (app) {
    app.use((err, req, res, next) => {
        console.error(err);
        res.back();
    });
};