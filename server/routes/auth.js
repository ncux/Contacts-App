const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// auth middleware
const authWare = require('./middleware/jwt-middleware');

// User model
const User = require('../models/User');

// get the currently logged in user
// Private
router.get('/', authWare, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user });
    } catch (e) {
       console.error(e.message);
       return res.status(500).json({ message: 'A server error has occurred.' });
    }
});


// authenticate the user and login
// Public
router.post('/login', [
    check('email', 'Email address is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req) || [];
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: 'User not found. Try registering as a new user.' });
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                return res.status(400).json({ message: 'Invalid password. Try again.' });
            }
            // prepare the JWT
            const payload = { user: { id: user.id } };
            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 21600 }, (err, token) => {
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

