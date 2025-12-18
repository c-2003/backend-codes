import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Models/user.mod.js';
import { validationResult } from 'express-validator';

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Generate a JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Login a user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate a JWT
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  };
  