import express, {Request, Response} from 'express';
import { body } from 'express-validator';
const Router = express.Router();

Router.post('/api/users/signout',[
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .isLength({min: 4, max: 20})
    .withMessage('Password must be between 4 and 20 characters')
],(req: Request, res: Response)=>{
    const {email, password} = req.body;

    if(!email || typeof name !== 'string'){
        return res.status(400).send('Please provide valid email');
    }
})

export {Router as SignUpRouter};