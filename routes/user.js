const express = require("express");
const axios = require('axios');
const router = express.Router();

const User = require("../models/user");

router.post('/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

  
      // Create new user
      const newUser = new User({
        username,
        email,
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  
      await newUser.save();
  
      // You can add GNews API integration here if needed
      // For example, fetching initial news for the user
      const gnewsResponse = await axios.get(`https://gnews.io/api/v4/top-headlines`, {
        params: {
          token: process.env.GNEWS_API_KEY,
          lang: 'en',
        },
      });
  
      res.status(201).json({ 
        message: 'User registered successfully',
        // initialNews: gnewsResponse.data.articles
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  });
  
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Validate password
      if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Update last login
      user.updatedAt = new Date();
      await user.save();

      //Generate JWT token
  
      // Login successful
      res.status(200).json({ 
        message: 'Login successful', 
        user: { 
          id: user._id, 
          username: user.username
        },
        //token: token // Include JWT token in response
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  });

  
  module.exports = router;
