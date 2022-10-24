import { NextFunction, Request, Response } from 'express';

export default interface IMiddleware {
  [string: string]: (req: Request, res: Response, next: NextFunction) => void | Promise<void>
}
