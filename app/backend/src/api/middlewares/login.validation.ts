import { compareSync } from 'bcryptjs';
import ILogin from '../../interfaces/Login';
import userService from '../services/login.service';
import IMiddleware from '../../interfaces/Middleware';
import { BAD_REQUEST, INVALID_CREDENTIALS } from '../../helpers/constants';

const loginValidation: IMiddleware = {

  validateFields(req, res, next) {
    const { email, password } = req.body as ILogin;
    if (!email || !password) {
      res.status(400).json(BAD_REQUEST);
    } else {
      next();
    }
  },

  async validateCredentials(req, res, next) {
    const { email, password } = req.body as ILogin;
    const user = await userService.find(email);
    if (user === null || !compareSync(password, user.password)) {
      res.status(401).json(INVALID_CREDENTIALS);
    } else {
      res.locals.user = user;
      next();
    }
  },
};

export default loginValidation;
