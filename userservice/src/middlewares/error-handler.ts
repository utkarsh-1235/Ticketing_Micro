import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../error/CustomEror";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
)=>{
if(err instanceof CustomError){
    return res.status(err.statusCode).send({errors: err.SerializeErrors()})
}



res.status(400).send({
    errors: [{
        message: 'Something went wrong'
    }]
})
}