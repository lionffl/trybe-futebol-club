import { NextFunction, Request, Response } from 'express';

export default interface Middleware {
  [string: string]: (req: Request, res: Response, next: NextFunction) => void | Promise<void>
}
