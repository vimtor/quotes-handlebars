const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('register.hbs');
});

module.exports = router;