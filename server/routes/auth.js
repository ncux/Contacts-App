const express = require('express');
const router = express.Router();


// get the logged in user
// private
router.get('/user', async (req, res) => {
    res.send('current user');
});

// login user and get JWT
// public
router.post('/login', async (req, res) => {
    res.send('login');
});

module.exports = router;
