import {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';

const errorHandler: ErrorRequestHandler = (
  error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = error.statusCode ?? 500;
  const message = error.message ?? 'Server error';
  res.status(statusCode).send({ statusCode, message });
  next();
};

export default errorHandler;
