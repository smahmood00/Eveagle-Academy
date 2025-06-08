import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    if (isConnected) {
      console.log('Using existing MongoDB connection');
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}; 