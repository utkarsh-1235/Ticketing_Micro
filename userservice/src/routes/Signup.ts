import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
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
        const error = new Error('Inavalid email or passowrd');
        error.reasons = errors.array();
        throw error;
        
    }
    const {email, password} = req.body;

    if(!email || typeof name !== 'string'){
        throw new Error('Please provide valid Email');
    }
    res.send({});
})

export {Router as SignUpRouter};