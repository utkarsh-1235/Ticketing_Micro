import express, {Request, Response} from 'express';
import {body, validationResult} from 'express-validator';
import { RequestValidationError } from '../error/Request-validation.error';
import { validateRequest } from '../middlewares/validateRequest';
import { userModel } from '../models/userModel';
import { BadRequestError } from '../error/BadRequest.Error';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/api/users/signin',[
                body('email')
                   .isEmail()
                   .withMessage('Email must be valid'),
                   body('password')
                   .trim()
                   .notEmpty()
                   .withMessage('Password must be provided')],
                   validateRequest,
                   async(req: Request, res: Response)=>{

                    const {email, password} = req.body;
                    if(!email || typeof email !== 'string'){
                        throw new Error('Please provide valid Email');
                    }

                    const existingUser = await userModel.findOne({
                        email
                    })

                    if(!existingUser){
                        throw new BadRequestError('User Not found');
                    }

                    const passwordmatch = await Password.compare(existingUser.password, password);

                    if(!passwordmatch){
                        throw new BadRequestError('Invalid Password');
                    }

                         const userJwt = jwt.sign({
                            id: existingUser.id,
                            email: existingUser.email
                         }, process.env.JWT_KEY);
                    
                         req.session = {
                            jwt: userJwt
                         }
                    
                        res.status(201).send(existingUser);
})

export {router as SignInRouter}