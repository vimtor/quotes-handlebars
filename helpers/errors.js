module.exports = function (app) {
    app.use((err, req, res) => {
        console.error(err);
        res.back();
    });
};