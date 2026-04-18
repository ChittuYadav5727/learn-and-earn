import { Wallet } from '../models/Wallet.js';
import { AppError } from '../utils/appError.js';

export async function getWalletByUser(userId) {
  const wallet = await Wallet.findOne({ user: userId }).lean();
  if (!wallet) {
    throw new AppError('Wallet not found', 404);
  }
  return wallet;
}
