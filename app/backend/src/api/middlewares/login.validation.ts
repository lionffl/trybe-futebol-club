import { NextFunction, Request, Response } from 'express';
import { compareSync } from 'bcryptjs';
import ILogin from '../interfaces/Login';
import userService from '../services/login.service';

const loginValidation = {

  validateFields(req: Request, res: Response, next: NextFunction): void {
    const { email, password } = req.body as ILogin;
    if (!email || !password) {
      res.status(400).json({ message: 'All fields must be filled' });
    } else {
      next();
    }
  },
  async validateCredentials(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body as ILogin;
    try {
      const user = await userService.find(email);
      if (user === null || !compareSync(password, user.password)) {
        res.status(401).json({ message: 'Incorrect email or password' });
      } else {
        next();
      }
    } catch (error) {
      res.status(500).json({ message: 'Unexpected error' });
    }
  },
};

export default loginValidation;
