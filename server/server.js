const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;

// bootstrap database connection
const database = require('./config/database');
database();

// routes
const contacts = require('./routes/contacts');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

// body-parse requests of content-type - application/x-www-form-urlencoded
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.use('/api/contacts', contacts);
app.use('/api/users', users);
app.use('/api/auth', auth);

// serve the React client assets for production
if(process.env.NODE_ENV === 'production') {
    // set the static dir
    app.use(express.static('../client/build'));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html')));
}

app.listen(port, () => console.log(`Server running on port ${port}`));

