export type HttpErrorArgs = {
  message: string;
  stack?: string;
  status: number;
};

export class HttpError extends Error {
  public status: number;

  constructor({ message, stack, status }: HttpErrorArgs) {
    super(message);
    this.stack = stack || new Error(message).stack;
    this.status = status;
  }

  static notFound(message) {
    return new HttpError({ message, status: 404 });
  }
}
