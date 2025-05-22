import { CustomError } from "./CustomEror";

export class NotAuthorizedError extends CustomError{
    statusCode = 401;
    constructor(){
        super('Not AUthorized');
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    SerializeErrors(){
        return [{
            message: 'Not Authorized'
        }]
    }
}