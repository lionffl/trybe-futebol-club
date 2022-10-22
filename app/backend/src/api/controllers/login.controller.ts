import getToken from '../../helpers/getToken';
import ILogin from '../interfaces/Login';
import userService from '../services/login.service';
import IController from '../interfaces/Controller';
import UserModel from '../database/models/UserModel';

const loginController: IController = {
  async auth(req, res) {
    const { email, password } = req.body as ILogin;
    const login = await userService.login(email, password) as UserModel;
    const { id } = login;
    const token = getToken(email, id);
    res.status(200).json({ token });
  },
};

export default loginController;
