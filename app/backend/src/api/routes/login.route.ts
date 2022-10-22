import { Router } from 'express';
import loginController from '../controllers/login.controller';
import loginValidation from '../middlewares/login.validation';

const {
  validateFields,
  validateCredentials,
} = loginValidation;

const { auth } = loginController;

const loginRoute = Router();

loginRoute.post('/', validateFields, validateCredentials, auth);

export default loginRoute;
