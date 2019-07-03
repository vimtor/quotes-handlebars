const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// Handlebars Middleware
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('views engine', '.hbs');

// Use 'public' folder for static assets.
app.use(express.static('public'));

// Basic Routing
app.get('/', (req, res) => {
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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server started on port:', PORT);
    console.log('http://localhost:5000/');
});