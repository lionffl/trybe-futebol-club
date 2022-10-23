import { Router } from 'express';
import loginController from '../controllers/login.controller';
import loginValidation from '../middlewares/login.validation';
import tokenAuthenticate from '../middlewares/authenticate';

const {
  validateFields,
  validateCredentials,
} = loginValidation;

const { authenticate } = tokenAuthenticate;
const { login, validate } = loginController;

const loginRoute = Router();

loginRoute.post('/', validateFields, validateCredentials, login);
loginRoute.use(authenticate);
loginRoute.get('/validate', validate);

export default loginRoute;
