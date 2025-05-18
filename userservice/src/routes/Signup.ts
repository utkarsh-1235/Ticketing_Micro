import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../error/Request-validation.error';
import { DatabaseConnectionError } from '../error/Databaseconnection.error';
import { userModel } from '../models/userModel';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../error/BadRequest.Error';
const Router = express.Router();

Router.post('/api/users/signup',[
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .isLength({min: 4, max: 20})
    .withMessage('Password must be between 4 and 20 characters')
], async(req: Request, res: Response)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
       
       throw new RequestValidationError(errors.array()); 
    }
    const {email, password} = req.body;

    if(!email || typeof name !== 'string'){
        throw new Error('Please provide valid Email');
    }

     const existingUser = await userModel.findOne({email});

     if(existingUser){
          throw new BadRequestError('Email already in use');
     }

     const user = userModel.build({
        email,
        password
     })

     await user.save();

     const userJwt = jwt.sign({
        id: user.id,
        email: user.email
     }, process.env.JWT_KEY);

     req.session = {
        jwt: userJwt
     }

    res.status(201).send(user);
})

export {Router as SignUpRouter};