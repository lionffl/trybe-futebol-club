import UserModel from '../../database/models/UserModel';
import getToken from '../../helpers/getToken';
import IController from '../interfaces/Controller';
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
  async validate(_req, res) {
    try {
      const { email } = res.locals.user;
      const user = await userService.find(email) as UserModel;
      res.status(200).json({ role: user.role });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  },
};

export default loginController;
