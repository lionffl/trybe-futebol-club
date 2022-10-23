import { Router } from 'express';
import loginController from '../controllers/login.controller';
import loginValidation from '../middlewares/login.validation';

const {
  validateFields,
  validateCredentials,
} = loginValidation;

const { login, validate } = loginController;

const loginRoute = Router();

loginRoute.post('/', validateFields, validateCredentials, login);
loginRoute.get('/validate', validate);

export default loginRoute;
