const express = require('express');
const mongoose = require('mongoose');
const {ensureAutheticated} = require('../helpers/auth');
const router = express.Router();

require('../models/Quote');
const Quote = mongoose.model('Quote');

router.get('/public', (req, res) => {
    Quote.find({visible: true})
        .then(quotes => res.render('quotes/public.hbs', {quotes}))
        .catch(err => console.log(err));
});

router.get('/private', ensureAutheticated, (req, res) => {
    Quote.find({user: req.user.id})
        .then(quotes => {
            res.render('quotes/private.hbs', {quotes});
        })
});

router.get('/add', ensureAutheticated, (req, res) => {
    res.render('quotes/add.hbs');
});

router.post('/add', ensureAutheticated, (req, res) => {
    const {author, quote, visible} = req.body;

    if (!quote) {
        req.flash('error', 'Quote cannot be empty');
        return res.redirect('/quotes/add');
    }

    const newQuote = {
        quote,
        author: author !== '' ? author : undefined,
        user: req.user.id,
        visible: !!visible
    };

    new Quote(newQuote)
        .save()
        .then(quote => {
            req.flash('success', 'Quote added succesfully!');
            res.redirect('/quotes/private',);
        })
        .catch(err => {
            console.log(err);
            req.flash('error', 'Something went wrong');
            res.redirect('/quotes/add');
        })
});

router.get('/edit/:id', ensureAutheticated, (req, res) => {
    // TODO: Check if user is the same.
    Quote.findById(req.params.id)
        .then(quote => {
            res.render('quotes/edit.hbs', {quote});
        });
});

router.post('/edit/:id', ensureAutheticated, (req, res) => {
    console.log(req.body);

    Quote.findById(req.params.id)
        .then(quote => {
            quote.author = req.body.author;
            quote.quote = req.body.quote;
            quote.visible = !!req.body.visible;

            quote.save()
                .then(() => {
                    req.flash('success', 'Quote updated successfully');
                    res.redirect('/quotes/private');
                })
                .catch(err => {
                    console.log(err);

                    req.flash('error', 'Failed at updating the quote.');
                    res.redirect(`/quotes/edit/${req.params.id}`);
                });
        })
        .catch(err => {
            console.log(err);

            req.flash('error', 'Failed at updating the quote.');
            res.redirect(`/quotes/edit/${req.params.id}`);
        });
});


module.exports = router;