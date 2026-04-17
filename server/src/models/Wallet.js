import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    balance: { type: Number, default: 0 },
    totalEarned: { type: Number, default: 0 },
    transactions: [
      {
        title: { type: String, required: true },
        type: { type: String, enum: ['credit', 'debit'], required: true },
        amount: { type: Number, required: true },
        status: { type: String, enum: ['completed', 'pending'], default: 'completed' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Wallet = mongoose.model('Wallet', walletSchema);
