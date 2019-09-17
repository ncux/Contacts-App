const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// User model
const User = require('../models/User');


// // render the login form
// router.get('/login', async (req, res) => {
//     res.render('login');
// });


// passport authentication
// router.post('/login', (req, res, next) => {
//     passport.authenticate('local', {
//         successRedirect: '/auth/dashboard',
//         failureRedirect: '/auth/login',
//         failureFlash: true
//     })(req, res, next);
// });


// logout user
// router.get('/logout', async (req, res) => {
//     req.logout();
//     req.flash('success_message', 'You have successfully logged out!');
//     res.redirect('/auth/login');
// });


// render the registration form
// router.get('/register', async (req, res) => {
//     res.render('register');
// });


// register a new user
router.post('/registration', [
    check('fullname', 'Full name is required').not().isEmpty(),
    check('email', 'Email address is required').not().isEmpty(),
    check('email', 'Enter a valid email address').isEmail(),
    check('password', 'Password address is required').not().isEmpty(),
    check('password', 'The password is too short').isLength({ min: 6 }),
    check('password', 'The passwords do not match').custom((value,{req, loc, path}) => {
        if (value !== req.body.password2) {
            throw new Error("Passwords don't match");
        } else {
            return value;
        }
    }),
], async (req, res) => {
    const errors = validationResult(req) || [];
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { fullname, email, password, password2 } = req.body;
    try {
        let user = await User.findOne({ email });
        if(user) {
            res.status(400).json({ message: 'Email already exists. Try logging in' });
        } else {
            user = new User({ fullname, email, password });
            // hash the password and save the user
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            res.send(`user: ${user}`);
        }
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: 'A server error occurred' });
    }

});


module.exports = router;

