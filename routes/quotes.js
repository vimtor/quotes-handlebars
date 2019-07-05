const express = require('express');
const router = express.Router();

router.get('/add', (req, res) => {
    res.render('quotes/add.hbs');
});

router.post('/add', (req, res) => {
    const errors = [];
    const {author, quote} = req.body;

    if (!author) {
        errors.push({message: 'Please submit an author.'});
    }

    if (!quote) {
        errors.push({message: 'Quote cannot be empty.'});
    }

    if (errors.length > 0) {
        res.render('quotes/add.hbs', {
            errors, author, quote
        });
    }
    else {
        res.render('quotes/add.hbs');
    }
});

module.exports = router;