import * as jwt from 'jsonwebtoken';
import getToken from '../../helpers/getToken';
import IController from '../../interfaces/Controller';
import userService from '../services/login.service';

const loginController: IController = {
  async login(_req, res) {
    try {
      const { email, id } = res.locals.user;
      const token = getToken(email, id);
      res.status(200).json({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  },
  async authenticate(req, res) {
    const token = req.header('Authorization');
    if (!token) {
      res.status(401).json({ message: 'Token not found' });
    } else {
      try {
        const decoded = jwt.verify(token, 'jwt_secret') as jwt.JwtPayload;
        const user = await userService.find(decoded.data.email);
        if (!user) {
          res.status(401).json({ message: 'Expired or invalid token' });
        }
        res.status(200).json({ role: user?.role });
      } catch (err) {
        res.status(401).json({ message: 'Expired or invalid token' });
      }
    }
  },
};

export default loginController;
