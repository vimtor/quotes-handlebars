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
    Quote.findById(req.params.id)
        .then(quote => {
            if (quote.user !== req.user.id) {
                req.flash('error', 'Not authorized.');
                return res.redirect('/quotes/public');
            }

            res.render('quotes/edit.hbs', {quote});
        });
});

router.post('/edit/:id', ensureAutheticated, (req, res) => {
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

router.post('/like/:id', (req, res) => {
    Quote.findById(req.params.id)
        .then(quote => {
            quote.likes += 1;

            quote.save()
                .then(() => {
                    res.back();
                })
                .catch(err => {
                    console.log(err);

                    req.flash('error', 'Failed at liking the quote.');
                    res.back();
                });
        })
        .catch(err => {
            console.log(err);

            req.flash('error', 'Failed at liking the quote.');
            res.back();
        });
});

router.post('/delete/:id', ensureAutheticated, (req, res) => {
    Quote.findById(req.params.id)
        .then(quote => {
            quote.delete()
                .then(() => {
                    req.flash('success', 'Deleted successfully.');
                    res.redirect('/quotes/private');
                })
                .catch(err => {
                    console.log(err);

                    req.flash('error', 'Failed at deleting the quote.');
                    res.back();
                });
        })
        .catch(err => {
            console.log(err);

            req.flash('error', 'Failed at deleting the quote.');
            res.back();
        });
});

module.exports = router;