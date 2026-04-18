import mongoose from 'mongoose';
import { env } from './env.js';

const READY_STATES = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

let hasAttachedListeners = false;

function attachConnectionListeners() {
  if (hasAttachedListeners) {
    return;
  }

  hasAttachedListeners = true;

  mongoose.connection.on('connected', () => {
    console.log(`MongoDB connected to ${env.mongoUri}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected');
  });

  mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error', error);
  });
}

export async function connectDb() {
  mongoose.set('strictQuery', true);
  attachConnectionListeners();
  await mongoose.connect(env.mongoUri, {
    serverSelectionTimeoutMS: 5000,
  });
}

export function getDbStatus() {
  return {
    state: READY_STATES[mongoose.connection.readyState] || 'unknown',
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host || null,
    name: mongoose.connection.name || null,
  };
}

export async function disconnectDb() {
  if (mongoose.connection.readyState === 0) {
    return;
  }

  await mongoose.disconnect();
}
