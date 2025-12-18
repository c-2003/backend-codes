import express from 'express';
import Children from '../Models/Children.mod.js';

const router = express.Router();

// Get all children
router.get('/', async (req, res) => {
  try {
    const children = await Children.find();
    res.json(children);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new child
router.post('/', async (req, res) => {
  try {
    const newChild = new Children(req.body);
    await newChild.save();
    res.status(201).json(newChild);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
