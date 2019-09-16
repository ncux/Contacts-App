const express = require('express');
const path = require('path');

// config settings
const settings = require('./config/settings');

// routes
const contacts = require('./routes/contacts');
const users = require('./routes/users');
const auth = require('./routes/auth');

const port = process.env.PORT || 5000;

// bootstrap database connection
const { database } = require('./config/database');

const app = express();

// static dir
// app.use(express.static(path.join(__dirname, 'public')));

// body-parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

app.use('/api/contacts', contacts);
app.use('/api/users', users);
app.use('/api/auth', auth);


app.listen(port, () => console.log(`Server running on port ${port}`));

