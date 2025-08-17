const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middleware/auth');

router.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.originalUrl}`);
    next();
});

router.get('/test', (req, res) => {
    res.send('Lists API is working');
});

router.post('/', verifyToken, async (req, res) => {
    console.log("Request Body Received:", JSON.stringify(req.body, null, 2)); 

    const { name, images } = req.body;

    if (!name || !Array.isArray(images) || images.length === 0) {
        return res.status(400).json({ message: 'Invalid data format' });
    }

    for (const img of images) {
        if (typeof img !== 'object' || !img.code || !img.image) {
            console.error("Invalid Image Object Detected:", img);
            return res.status(400).json({ message: 'Each image must have `code` and `image` fields.' });
        }
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        console.log("List to be saved:", { name, images });

        user.savedLists.push({ name, images });
        await user.save();

        res.status(201).json({ message: 'List saved successfully' });
    } catch (error) {
        console.error('Error saving list:', error.message);
        res.status(500).json({ message: error.message });
    }
});

router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ savedLists: user.savedLists || [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:listId', verifyToken, async (req, res) => {
    const { name, images } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const list = user.savedLists.id(req.params.listId);
        if (!list) return res.status(404).json({ message: 'List not found' });

        if (name) list.name = name; 
        if (images) list.images = images; 

        await user.save();
        res.json({ message: 'List updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:listId', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.savedLists = user.savedLists.filter(list => list._id.toString() !== req.params.listId);

        await user.save();

        res.json({ message: 'List deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
