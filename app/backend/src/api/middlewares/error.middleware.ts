import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { GENERIC_ERROR } from '../../helpers/constants';

async function errorHandler(_: ErrorRequestHandler, _2: Request, res: Response, _3: NextFunction) {
  res.status(500).json(GENERIC_ERROR);
}

export default errorHandler;
