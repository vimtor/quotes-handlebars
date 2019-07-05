const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/quotes-dev', {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDB is connected.'))
    .catch(err => console.log(err));


// Handlebars Middleware
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('views engine', '.hbs');


// Express Middleware.
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Express Session Middleware.
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Flash Middleware
app.use(flash());

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success');
    res.locals.error_msg = req.flash('error');

    next();
});

// Basic Routing
require('./routes')(app);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server started on port:', PORT);
    console.log('http://localhost:5000/');
});