export class DatabaseConnectionError extends Error{
    reason = "Error in connecting databse";
    constructor(){

        super();

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
}