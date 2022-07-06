export type HttpErrorArgs = {
  message: string;
  stack?: string;
  statusCode: number;
};

export class HttpError extends Error {
  public statusCode: number;

  constructor({ message, stack, statusCode }: HttpErrorArgs) {
    super(message);
    this.stack = stack || new Error(message).stack;
    this.statusCode = statusCode;
  }

  static notFound(message) {
    return new HttpError({ message, statusCode: 404 });
  }
}
