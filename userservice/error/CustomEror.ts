export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  
abstract SerializeErrors(): {
    message: string;
    field?: string;
}[]
}
