import { CustomError } from "./CustomEror";

export class NotFoundError extends CustomError{
    statusCode = 401;
    constructor(){
        super('Not Found');
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    SerializeErrors(){
        return [{
            message: 'Not Found'
        }]
    }
}