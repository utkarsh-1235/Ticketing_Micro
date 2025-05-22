import { NotAuthorizedError } from "../error/NotAuthorizedError";
import {Request, Response, NextFunction}l from 'express';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if(!req.currentUser){
         throw new NotAuthorizedError();
    }
    next();
}