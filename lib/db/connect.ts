import mongoose from 'mongoose';

declare global {
  var mongoose: {
    isConnected: boolean;
  } | undefined;
}

// Load environment variables
const MONGODB_URI = process.env.MONGODB_URI;
console.log('Environment variables loaded:', {
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: MONGODB_URI ? '[URI EXISTS]' : '[URI MISSING]'
});

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable. Create a .env file in the root directory with:\nMONGODB_URI=your_mongodb_connection_string'
  );
}

// TypeScript type assertion since we've checked MONGODB_URI exists
const MONGODB_URI_SAFE = MONGODB_URI as string;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { isConnected: false };
}

export async function connectToDB() {
  if (!cached) {
    cached = global.mongoose = { isConnected: false };
    }

  if (cached.isConnected) {
      console.log('Using existing MongoDB connection');
      return;
    }

  try {
    await mongoose.connect(MONGODB_URI_SAFE);
    cached.isConnected = true;
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
} 