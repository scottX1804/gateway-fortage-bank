const express = require('express');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Get account details
router.get('/details', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.json({
      accountNumber: user.accountNumber,
      accountType: user.accountType,
      balance: user.balance,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get account balance
router.get('/balance', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.json({
      balance: user.balance,
      accountNumber: user.accountNumber
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update account balance (Internal use only)
router.post('/update-balance', verifyToken, async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Account not found' });
    }

    if (user.balance + amount < 0) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    user.balance += amount;
    user.updatedAt = new Date();
    await user.save();

    res.json({
      message: 'Balance updated',
      balance: user.balance
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;