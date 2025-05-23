// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';

// Route imports
import getUserRoute from './routes/getUserRoute';
import signUpRoute from './routes/SignUpRoute';
import logoutRoute from './routes/logoutRoute';
import loginRoute from './routes/LoginRoute';
import addressRoute from './routes/AddressRoute';

dotenv.config();

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

app.use('/api/users', signUpRoute);
app.use('/api/users', loginRoute);
app.use('/api/users', addressRoute);
app.use('/api/users', logoutRoute);
app.use('/api/users', getUserRoute);

export { app };
