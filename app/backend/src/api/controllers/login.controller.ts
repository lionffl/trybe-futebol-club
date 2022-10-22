import getToken from '../../helpers/getToken';
import IController from '../interfaces/Controller';

const loginController: IController = {
  async auth(_req, res) {
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
};

export default loginController;
