import { CustomError } from "./CustomEror";

export class BadRequest extends CustomError{
    statusCode = 401;
    constructor(){
        super('Bad Request');
        Object.setPrototypeOf(this, BadRequest.prototype);
    }

    SerializeErrors(){
        return [{
            message: 'Bad Request'
        }]
    }
}