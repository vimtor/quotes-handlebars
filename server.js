//
// This file starts the server.
// This is decoupled from app.js so testing can be done independently.
//

const mongoose = require("mongoose");

const app = require('./app');
const keys = require('./config/keys');


// Connect to MongoDB
mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
    .then(() => console.log('MongoDB is connected.'))
    .catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server started on port:', PORT);

    if (process.env.NODE_ENV !== 'production') {
        console.log('http://localhost:5000/');
    }
});