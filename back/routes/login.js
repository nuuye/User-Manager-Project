const express = require('express');
const router = express.Router();
const User = require('../models/users');

// Get all users
router.get('/', async (req, res) => {
    try {
        res.json(await User.find());
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new user
router.post('/register', async (req, res) => {
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

// Modify a parameter
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.username != null) res.user.username = req.body.username;
    if (req.body.password != null) res.user.password = req.body.password;
    if (req.body.balance != null) res.user.balance = req.body.balance;
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

// Delete an account
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.deleteOne()
        res.json({ message: "Account deleted" })
    } catch (err) { res.status(500).json({ message: err.message }) }
})


//Middleware to get an user by his ID
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) return res.status(404).json({ message: "user not found" });
    } catch (err) { res.status(500).json({ message: err.message }) }
    res.user = user;
    next();
}

module.exports = router;