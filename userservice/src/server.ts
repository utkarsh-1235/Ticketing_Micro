import { connect } from "mongoose";

import app from './index' // import the Express app
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const PORT = process.env.PORT || 3000;

export const connectToDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI must be defined');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
app.listen(PORT, async () => {
  await connectToDB();
  console.log(`User Service is running on port ${PORT}`);
});
