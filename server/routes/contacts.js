const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Contact = require('../models/Contact');

// auth middleware
const authWare = require('./middleware/jwt-middleware');

// get all logged in user's contacts [OK!]
router.get('/', authWare, async (req, res) => {
    try {
        let contacts = await Contact.find({ user: req.user.id }).sort({date: -1});
        res.json({ contacts });
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Failed to retrieve contacts from the database!');
    }
});

// create a contact [OK!]
router.post('/new', [authWare, [
    check('fullname', 'Full name is required').not().isEmpty(),
    check('email', 'Email address is required').not().isEmpty(),
    check('email', 'Enter a valid email address').isEmail(),
    check('phone', 'Phone number is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req) || [];
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { fullname, email, phone, type } = req.body;
    try {
        const contact = new Contact({ user: req.user.id, fullname, email, phone, type });
        await contact.save();
        res.json({ contact });
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Failed to save contact.');
    }
});

// update a contact [0K!]
router.put('/edit/:id', [authWare, [
    check('fullname', 'Full name is required').not().isEmpty(),
    check('email', 'Email address is required').not().isEmpty(),
    check('email', 'Enter a valid email address').isEmail(),
    check('phone', 'Phone number is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req) || [];
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { fullname, email, phone, type } = req.body;
    const update = {};
    if(fullname) update.fullname = fullname;
    if(email) update.email = email;
    if(phone) update.phone = phone;
    if(type) update.type = type;
    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(404).json({ message: 'Contact not found' });
        if(contact.user.toString() !== req.user.id) res.status(401).send('You are not authorized to make this change.');
        contact = await Contact.findByIdAndUpdate(req.params.id, { $set: update }, { new: true });
        return res.status(202).json({ contact });
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Failed to update contact.');
    }
});

// delete a contact
router.delete('/delete/:id', authWare, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(404).json({ message: 'Contact not found' });
        if(contact.user.toString() !== req.user.id) res.status(401).send('You are not authorized to make this change.');
        await Contact.findByIdAndRemove(req.params.id);
        return res.status(202).json({ message: 'Contact successfully deleted!' });
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Failed to delete contact.');
    }
});


module.exports = router;
