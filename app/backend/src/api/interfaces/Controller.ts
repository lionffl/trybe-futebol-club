import { Request, Response } from 'express';

export default interface IController {
  [string: string]: (req: Request, res: Response) => void | Promise<void>
}
