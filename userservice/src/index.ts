import express from 'express';
import dotenv from 'dotenv';
import { trusted } from 'mongoose';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';   
import morgan from 'morgan';
import mongoose from 'mongoose';
import { SignUpRouter } from './routes/Signup';
import { SignOutRouter } from './routes/Signout';
import { CurrentUserRouter } from './routes/Currentuser';
import { SignInRouter } from './routes/Signin';
import { NotFound } from '../error/NotFound.error';
import { errorHandler } from './middlewares/error-handler';

const app = express(); 
dotenv.config();
const Port = 4000;
app.set('trust proxy', true); // trust first proxy
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev')); 
app.use(cookieParser());

app.use(cookieSession({
    signed: false,
    secure: trusted
}));

app.use(morgan('dev'));
app.get('*', ()=>{
    throw new NotFound();
})

app.use(errorHandler);

const start = async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URI)
        .then(()=> console.log('Connected to MongoDB'))
        .catch((err)=> console.error(err))
        
    }
    catch(err){
        console.error(err);
    }
}
app.use(SignUpRouter);
app.use(SignOutRouter);
app.use(CurrentUserRouter);
app.use(SignInRouter);

app.listen(Port, ()=>{
    console.log(`Server is running on port ${Port}`)
})

start();

module.exports = app;