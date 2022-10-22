import { NextFunction, Request, Response } from 'express';
import ILogin from '../interfaces/Login';

const loginValidation = {

  validateFields(req: Request, res: Response, next: NextFunction): void {
    const { email, password } = req.body as ILogin;
    if (!email || !password) {
      res.status(400).json({ message: 'All fields must be filled' });
    } else {
      next();
    }
  },
};

export default loginValidation;
