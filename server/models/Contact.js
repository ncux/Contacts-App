const mongoose = require('mongoose');

const Contact = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'mern - contacts app users',
            required: true
        },
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true
        },
        type: {
          type: String,
          default: 'personal'
        },
        date: {
            type: Date,
            default: Date.now()
        },
    }
);

module.exports = mongoose.model('mern - contacts app contacts', Contact);
