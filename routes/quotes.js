const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

require('../models/Quote');
const Quote = mongoose.model('Quote');


router.get('/add', (req, res) => {
    res.render('quotes/add.hbs');
});

router.post('/add', (req, res) => {
    const messages = [];
    const {author, quote} = req.body;

    if (!quote) {
        messages.push({
            text: 'Quote cannot be empty.',
            type: 'danger'
        });

        return res.render('quotes/add.hbs', {author, quote, messages});
    }

    const newQuote = {
        quote,
        author: author !== '' ? author : undefined
    };

    new Quote(newQuote)
        .save()
        .then(quote => {
            messages.push({
                text: 'Quote added succesfully',
                type: 'success'
            });

            res.render('quotes/add.hbs', {messages});
        });
});


module.exports = router;