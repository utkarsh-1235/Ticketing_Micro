import { NotAuthorizedError } from "../error/NotAuthorizedError";
import {Request, Response, NextFunction} from 'express';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if(!req.currentUser){
         throw new NotAuthorizedError();
    }
    next();
}