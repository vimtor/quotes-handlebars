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
        res.render('quotes/add.hbs', {
            author,
            quote,
            messages: [
                {
                    text: 'Quote cannot be empty.',
                    type: 'danger'
                }
            ]
        });
    }
    else {
        const newQuote = {
            quote,
            author: author !== '' ? author : undefined
        };

        new Quote(newQuote)
            .save()
            .then(quote => {
                res.render('quotes/add.hbs', {
                    messages: [
                        {
                            text: 'Quote added succesfully',
                            type: 'success'
                        }
                    ]
                });
            });
    }
});

module.exports = router;