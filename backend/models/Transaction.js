const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['deposit', 'withdrawal', 'transfer', 'payment'],
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Please provide amount'],
    min: [0.01, 'Amount must be greater than 0']
  },
  description: {
    type: String,
    required: true
  },
  recipientAccount: {
    type: String,
    required: function() {
      return this.type === 'transfer';
    }
  },
  recipientName: String,
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'completed'
  },
  transactionFee: {
    type: Number,
    default: 0
  },
  referenceNumber: {
    type: String,
    unique: true,
    default: () => 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9)
  },
  balanceAfter: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
transactionSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);