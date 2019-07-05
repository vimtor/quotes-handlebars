const express = require('express');
const router = express.Router();


router.get('/login', (req, res) => {
    res.render('users/login.hbs');
});

router.get('/register', (req, res) => {
    res.render('users/register.hbs');
});


module.exports = router;