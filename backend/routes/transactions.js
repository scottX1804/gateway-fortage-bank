const express = require('express');
const { body, validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Get user transactions
router.get('/', verifyToken, async (req, res) => {
  try {
    const { limit = 10, skip = 0 } = req.query;
    
    const transactions = await Transaction.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const total = await Transaction.countDocuments({ userId: req.user.id });

    res.json({
      transactions,
      total,
      limit: parseInt(limit),
      skip: parseInt(skip)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get transaction by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create deposit
router.post('/deposit', verifyToken, [
  body('amount').isFloat({ min: 0.01 }).withMessage('Valid amount required'),
  body('description').trim().notEmpty().withMessage('Description required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, description } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update balance
    user.balance += amount;
    await user.save();

    // Create transaction record
    const transaction = new Transaction({
      userId: req.user.id,
      type: 'deposit',
      amount,
      description,
      balanceAfter: user.balance,
      status: 'completed'
    });

    await transaction.save();

    res.status(201).json({
      message: 'Deposit successful',
      transaction,
      newBalance: user.balance
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create withdrawal
router.post('/withdrawal', verifyToken, [
  body('amount').isFloat({ min: 0.01 }).withMessage('Valid amount required'),
  body('description').trim().notEmpty().withMessage('Description required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, description } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    // Update balance
    user.balance -= amount;
    await user.save();

    // Create transaction record
    const transaction = new Transaction({
      userId: req.user.id,
      type: 'withdrawal',
      amount,
      description,
      balanceAfter: user.balance,
      status: 'completed'
    });

    await transaction.save();

    res.status(201).json({
      message: 'Withdrawal successful',
      transaction,
      newBalance: user.balance
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create transfer
router.post('/transfer', verifyToken, [
  body('amount').isFloat({ min: 0.01 }).withMessage('Valid amount required'),
  body('recipientAccount').notEmpty().withMessage('Recipient account required'),
  body('recipientName').notEmpty().withMessage('Recipient name required'),
  body('description').trim().notEmpty().withMessage('Description required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, recipientAccount, recipientName, description } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    // Find recipient
    const recipient = await User.findOne({ accountNumber: recipientAccount });
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient account not found' });
    }

    // Update sender balance
    user.balance -= amount;
    await user.save();

    // Update recipient balance
    recipient.balance += amount;
    await recipient.save();

    // Create transaction for sender
    const senderTransaction = new Transaction({
      userId: req.user.id,
      type: 'transfer',
      amount,
      description,
      recipientAccount,
      recipientName,
      balanceAfter: user.balance,
      status: 'completed'
    });

    await senderTransaction.save();

    res.status(201).json({
      message: 'Transfer successful',
      transaction: senderTransaction,
      newBalance: user.balance
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;