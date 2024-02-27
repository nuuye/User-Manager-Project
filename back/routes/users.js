const express = require('express');
const router = express.Router();
const User = require('../models/users');
const { model } = require('mongoose');

// Get all users
router.get('/', async (req, res) => {
    try {
        res.json(await User.find());
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new user
router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Verify user
router.post('/try', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username, password: password });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;