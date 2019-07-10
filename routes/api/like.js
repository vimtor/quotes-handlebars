const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

require('../../models/Quote');
const Quote = mongoose.model('Quote');

router.post('/', async (req, res) => {
    try {
        const id = req.body.id;

        const quote = await Quote.findById(id);
        quote.likes += 1;

        await quote.save();
        res.json({likes: quote.likes});
    }
    catch (error) {
        console.error(error);
        res.status(400).json({error});
    }
});


module.exports = router;