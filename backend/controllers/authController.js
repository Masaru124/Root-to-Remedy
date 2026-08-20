const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { getMongoStatus } = require('../config/db');
const { JWT_SECRET } = require('../middleware/auth');

// Seed mock users for quick testing
const MOCK_USERS = [
  { id: 'usr_farmer1', email: 'farmer@herbs.org', password: 'password123', name: 'Rajesh Farmer', role: 'farmer', organization: 'Green Valley Organic Farms' },
  { id: 'usr_lab1', email: 'lab@ayurveda.com', password: 'password123', name: 'Dr. Anita Lab Tech', role: 'lab', organization: 'Apex Botanical Analytics Lab' },
  { id: 'usr_mfr1', email: 'mfr@ayurveda.com', password: 'password123', name: 'Vikram Manufacturer', role: 'manufacturer', organization: 'Himalayan Herbal Formulations Ltd' }
];

async function login(req, res) {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }

    let user = null;

    if (getMongoStatus()) {
      user = await User.findOne({ email: email.toLowerCase() });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ success: false, error: 'Invalid email or password.' });
        }
      }
    }

    // Fallback / mock user check
    if (!user) {
      user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user || user.password !== password) {
        return res.status(401).json({ success: false, error: 'Invalid credentials. Use preset demo buttons for fast testing.' });
      }
    }

    const payload = {
      sub: user._id || user.id,
      email: user.email,
      name: user.name,
      role: role || user.role,
      organization: user.organization
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' });

    return res.json({
      success: true,
      data: {
        token,
        user: {
          id: payload.sub,
          email: payload.email,
          name: payload.name,
          role: payload.role,
          organization: payload.organization
        }
      }
    });
  } catch (err) {
    console.error('[Auth Login Error]', err);
    return res.status(500).json({ success: false, error: 'Authentication failed.' });
  }
}

async function register(req, res) {
  try {
    const { email, password, name, role, organization } = req.body;

    if (!email || !password || !name || !role) {
      return res.status(400).json({ success: false, error: 'All fields are required.' });
    }

    if (getMongoStatus()) {
      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) {
        return res.status(400).json({ success: false, error: 'User email already registered.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email: email.toLowerCase(),
        password: hashedPassword,
        name,
        role,
        organization: organization || 'RootToRemedy Partner'
      });

      return res.status(201).json({
        success: true,
        data: { id: newUser._id, email: newUser.email, role: newUser.role, name: newUser.name }
      });
    }

    return res.status(201).json({
      success: true,
      data: { id: 'mock_' + Date.now(), email, role, name }
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { login, register };
