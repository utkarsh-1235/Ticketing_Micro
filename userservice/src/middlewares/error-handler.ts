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
    console.log('Request validation Error')
}

if(err instanceof DatabaseConnectionError){
    console.log('Database COnnection Error')
}

res.status(400).send({
    message: err.message
})
}