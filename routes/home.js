const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

require('../models/Quote');
const Quote = mongoose.model('Quote');


router.get('/', (req, res) => {
    Quote.find()
        .then(quotes => res.render('quotes/public.hbs', {quotes}))
        .catch(err => console.log(err));
});


module.exports = router;