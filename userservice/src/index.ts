import {app} from './server'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const Port = process.env.PORT;

const start = async()=>{
    try{
        if(!process.env.JWT_KEY){
            throw new Error("JWT_KEY must be defined");
        }
    await mongoose.connect(process.env.MONGO_URI)
        .then(()=> console.log('Connected to MongoDB'))
        .catch((err)=> console.error(err))
        
    }
    catch(err){
        console.error(err);
    }
}

app.listen(Port, ()=>{
    console.log(`Server is running on port ${Port}`)
})

start();

