// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import { NotFoundError } from './error/NotFound.error';

// Route imports
import { CurrentUserRouter } from './routes/Currentuser';
import { SignUpRouter } from './routes/Signup';
import { SignInRouter } from './routes/Signin';
import { SignOutRouter } from './routes/Signout';
import mongoose from 'mongoose';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'development'
}));

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


app.use('/api/users', SignUpRouter);
app.use('/api/users', SignInRouter);
app.use('/api/users', CurrentUserRouter);   
app.use('/api/users', SignOutRouter);


app.use('*', (req, res)=>{
    throw new NotFoundError();
})

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`User Service is running on port ${PORT}`);
});
export { app };
