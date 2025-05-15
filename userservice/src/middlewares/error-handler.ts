import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "./Request-validation.error";
import { DatabaseConnectionError } from "./Databaseconnection.error";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
)=>{
if(err instanceof RequestValidationError){
    return res.status(err.statusCode).send({errors: err.SerializeErrors()})
}

if(err instanceof DatabaseConnectionError){
    return res.status(err.statusCode).send({
        errors: err.serializeErrors()
    })
}

res.status(400).send({
    errors: [{
        message: 'Something went wrong'
    }]
})
}