const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

require('../models/Quote');
const Quote = mongoose.model('Quote');


router.get('/add', (req, res) => {
    res.render('quotes/add.hbs');
});

router.post('/add', (req, res) => {
    const {author, quote} = req.body;

    if (!quote) {
        req.flash('error', 'Quote cannot be empty');
        return res.redirect('/quotes/add');
    }

    const newQuote = {
        quote,
        author: author !== '' ? author : undefined
    };

    new Quote(newQuote)
        .save()
        .then(quote => {
            req.flash('success', 'Quote added succesfully!');
            res.redirect('/quotes/add',);
        });
});


module.exports = router;