import { ValidationError } from "express-validator";

interface CustomError{
    statusCode: number;
    SerializeErrors():{ 
    message: string;
    field?: string;
    }[]
}
export class RequestValidationError extends Error{
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