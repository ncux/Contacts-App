const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User model
const User = require('../models/User');

// register a new user
router.post('/registration', [
    check('fullname', 'Full name is required').not().isEmpty(),
    check('email', 'Email address is required').not().isEmpty(),
    check('email', 'Enter a valid email address').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'The password is too short').isLength({ min: 6 }),
    // check('password', 'The passwords do not match').custom((value,{req, loc, path}) => {
    //     if (value !== req.body.password2) {
    //         throw new Error("Passwords don't match");
    //     } else {
    //         return value;
    //     }
    // })
], async (req, res) => {
    const errors = validationResult(req) || [];
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { fullname, email, password, password2 } = req.body;
    try {
        let user = await User.findOne({ email });
        if(user) {
            res.status(400).json({ message: 'Email already exists. Try logging in.' });
        } else {
            user = new User({ fullname, email, password });
            // hash the password and save the user
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            // prepare the JWT
            const payload = { user: { id: user.id } };
            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 21600 }, (err, token) => {   // token expires in about 6 hours
               if(err) throw err;
               res.json({ token });
            });
        }
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: 'A server error occurred' });
    }

});


module.exports = router;
