import { ValidationError } from "express-validator";
import { CustomError } from "./CustomEror";


export class RequestValidationError extends CustomError{
    statusCode = 400;
    constructor(public errors: ValidationError[]){
        super('Invalid Request Parameters')

        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    SerializeErrors(){
        return this.errors.map((error)=>{
            return {message: error.msg, field: error.param};
        })
    }
}