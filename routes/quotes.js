const express = require('express');
const mongoose = require('mongoose');
const {ensureAutheticated} = require('../helpers/auth');
const router = express.Router();

require('../models/Quote');
const Quote = mongoose.model('Quote');

router.get('/public', async (req, res) => {
    try {
        const quotes = await Quote.find({visible: true}).sort({'likes': 'desc'});
        res.render('quotes/public.hbs', {quotes});
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/private', ensureAutheticated, async (req, res) => {
    try {
        const quotes = await Quote.find({user: req.user.id});
        res.render('quotes/private.hbs', {quotes});
    }
    catch (err) {
        console.log(err);
        res.redirect('/quotes/public');
    }
});

router.get('/add', ensureAutheticated, (req, res) => {
    res.render('quotes/add.hbs');
});

router.post('/', ensureAutheticated, async (req, res) => {
    const {author, quote, visible} = req.body;

    if (!quote) {
        req.flash('error', 'Quote cannot be empty');
        return res.redirect('/quotes/add');
    }

    try {
        await new Quote({
            quote,
            author: author !== '' ? author : undefined,
            user: req.user.id,
            visible: !!visible
        }).save();

        req.flash('success', 'Quote added succesfully!');
        res.redirect('/quotes/private');
    }
    catch (err) {
        console.log(err);

        req.flash('error', 'Something went wrong');
        res.redirect('/quotes/add');
    }
});

router.get('/edit/:id', ensureAutheticated, async (req, res) => {
    const quote = await Quote.findById(req.params.id);

    if (quote.user !== req.user.id) {
        req.flash('error', 'Not authorized.');
        return res.redirect('/quotes/public');
    }

    res.render('quotes/edit.hbs', {quote});
});


router.put('/:id', ensureAutheticated, async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);

        quote.author = req.body.author;
        quote.quote = req.body.quote;
        quote.visible = !!req.body.visible;

        await quote.save();

        req.flash('success', 'Quote updated successfully');
        res.redirect('/quotes/private');
    }
    catch (err) {
        console.log(err);

        req.flash('error', 'Failed at updating the quote.');
        res.redirect(`/quotes/edit/${req.params.id}`);
    }
});

router.post('/like/:id', async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);
        quote.likes += 1;

        await quote.save();
        res.back();
    }
    catch (err) {
        console.log(err);

        req.flash('error', 'Failed at liking the quote.');
        res.back();
    }
});

router.delete('/:id', ensureAutheticated, async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);
        await quote.delete();

        req.flash('success', 'Deleted successfully.');
        res.redirect('/quotes/private');
    }
    catch (err) {
        console.log(err);

        req.flash('error', 'Failed at deleting the quote.');
        res.back();
    }
});

module.exports = router;