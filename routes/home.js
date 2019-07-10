const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.redirect('/quotes/public');
});


module.exports = router;