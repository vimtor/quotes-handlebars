const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const app = express();


mongoose.connect('mongodb://localhost/quotes-dev', {
    useMongoClient: true
})
    .then(() => {
        console.log('MongoDB is connected.');
    })
    .catch(err => console.log(err));


// Handlebars Middleware
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('views engine', '.hbs');

// Express Middleware.
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Basic Routing
require('./routes')(app);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server started on port:', PORT);
    console.log('http://localhost:5000/');
});