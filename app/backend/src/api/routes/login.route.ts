import { Router } from 'express';
import loginController from '../controllers/login.controller';
import loginValidation from '../middlewares/validations/login.middleware';
import 'express-async-errors';
import errorMiddleware from '../middlewares/error.middleware';

const {
  validateFields,
  validateCredentials,
} = loginValidation;

const { login, validate } = loginController;

const loginRoute = Router();

loginRoute.post('/', validateFields, validateCredentials, login);
loginRoute.get('/validate', validate);
loginRoute.use(errorMiddleware);

export default loginRoute;
