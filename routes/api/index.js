//
// This script is used as funnel for every api request.
// That way you can remove all that logic from your server file.
//
const express = require('express');
const router = express.Router();

router.use('/like', require('./like'));

module.exports = router;