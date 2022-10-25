import * as jwt from 'jsonwebtoken';
import { INVALID_TOKEN, NOT_FOUND_TOKEN, SECRET } from '../../helpers/constants';
import * as helper from '../../helpers/functions';
import IController from '../../interfaces/Controller';
import userService from '../services/login.service';

const loginController: IController = {

  async login(_req, res) {
    const { email, id } = res.locals.user;
    const token = helper.getToken(email, id);
    res.status(200).json({ token });
  },

  async authenticate(req, res) {
    const token = req.header('Authorization');
    if (!token) {
      res.status(401).json(NOT_FOUND_TOKEN);
    } else {
      try {
        const decoded = jwt.verify(token, SECRET) as jwt.JwtPayload;
        const user = await userService.find(decoded.data.email);
        if (!user) {
          res.status(401).json(INVALID_TOKEN);
        } else {
          res.status(200).json({ role: user.role });
        }
      } catch (err) {
        res.status(401).json(INVALID_TOKEN);
      }
    }
  },
};

export default loginController;
