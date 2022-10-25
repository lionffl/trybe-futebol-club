import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { SECRET, INVALID_TOKEN } from '../../helpers/constants';
import userService from '../services/login.service';

export default async function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');
  if (!token) {
    res.status(401).json(INVALID_TOKEN);
  } else {
    try {
      const decoded = jwt.verify(token, SECRET) as jwt.JwtPayload;
      const user = await userService.find(decoded.data.email);
      if (!user) {
        res.status(401).json(INVALID_TOKEN);
      } else {
        next();
      }
    } catch (err) {
      res.status(401).json(INVALID_TOKEN);
    }
  }
}
