import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../middlewares/Request-validation.error';
import { DatabaseConnectionError } from '../middlewares/Databaseconnection.error';
const Router = express.Router();

Router.post('/api/users/signup',[
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .isLength({min: 4, max: 20})
    .withMessage('Password must be between 4 and 20 characters')
],(req: Request, res: Response)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
       
       throw new RequestValidationError(errors.array()); 
    }
    const {email, password} = req.body;

    if(!email || typeof name !== 'string'){
        throw new Error('Please provide valid Email');
    }

    throw new DatabaseConnectionError();
    res.send({});
})

export {Router as SignUpRouter};