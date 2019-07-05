const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.hbs', {
        quotes: [
            {
                text: 'There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.',
                author: 'Jeff Atwood'
            },
            {
                text: 'My name is Ralph!',
                author: 'Ralph Wiggum'
            },
            {
                text: 'Be water, my friend.',
                author: 'Bruce Lee'
            }
        ]
    });
});

module.exports = router;