const express = require('express');

const router = express.Router();

const Contact = require('../models/Contact');

// get all logged in user's contacts [OK!]
router.get('/', async (req, res) => {
    try {
        let contacts = await Contact.find().sort({date: -1});
        res.render('ideas/ideas', {contacts: contacts});
    } catch (e) {
        res.status(500).send(e, 'Failed to retrieve ideas from the database!');
    }
});

// create a contact [OK!]
router.post('/new', async (req, res) => {
    let errors = [];
    console.log(req.body);
    if (!req.body.title) {errors.push({message: 'Title is required!'})}
    if (!req.body.details) {errors.push({message: 'Details are required!'})}
    if (errors.length > 0) {
        res.render('ideas/add', {errors: errors, title: req.body.title, details: req.body.details});
    } else {
        let idea = new Idea({title: req.body.title, details: req.body.details});
        try {
            await idea.save();
            req.flash('success_message', 'Video idea was successfully added!');
            res.redirect('/ideas');
        } catch (e) {
            res.status(500).send(e, 'Failed to add idea!');
        }
    }
});

// update a contact [0K!]
router.put('/edit/:id', async (req, res) => {
    try {
        await Contact.findByIdAndUpdate(req.params.id, {title: req.body.title, details: req.body.details});
        req.flash('success_message', 'Video idea was successfully updated!');
        res.redirect('/ideas');
    } catch (e) {
        res.status(500).send(e, 'Failed to update idea!');
    }
});

// delete a contact
router.delete('/delete/:id', async (req, res) => {
    try {
        await Contact.findByIdAndRemove(req.params.id);
        req.flash('success_message', 'Video idea was successfully deleted!');
        res.redirect('/ideas');
    } catch (e) {
        res.status(500).send(e, 'Failed to delete idea from the database!');
    }
});






// // get add contact form [OK!]
// router.get('/new', (req, res) => {
//     res.render('add new contact');
// });
//
// // get update contact form [OK!]
// router.get('/update/:id', async (req, res) => {
//     try {
//         let idea = await Contact.findById(req.params.id);
//         res.render('ideas/update', {idea: idea});
//     } catch (e) {
//         res.status(500).send(e, 'Failed to retrieve idea from the database!');
//     }
// });


module.exports = router;
