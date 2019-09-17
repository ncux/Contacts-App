const mongoose = require('mongoose');
const config = require('config');

const mongodb = config.get('dbUrl');

const dbConnection = async () => {
    try {
        await mongoose.connect(mongodb, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
        console.log('Connected to the database!');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = dbConnection;
