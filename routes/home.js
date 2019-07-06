const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

require('../models/Quote');
const Quote = mongoose.model('Quote');


router.get('/', (req, res) => {
    res.redirect('/quotes/public');
});


module.exports = router;