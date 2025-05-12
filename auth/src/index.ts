import express from 'express';
import dotenv from 'dotenv';
import { trusted } from 'mongoose';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';   
import morgan from 'morgan';

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

app.listen(Port, ()=>{
    console.log(`Server is running on port ${Port}`)
})


module.exports = app;