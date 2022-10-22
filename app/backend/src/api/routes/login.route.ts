import { Router } from 'express';
import loginValidation from '../middlewares/login.validation';

const {
  validateFields,
  validateCredentials,
} = loginValidation;

const loginRoute = Router();

loginRoute.post('/', validateFields, validateCredentials);

export default loginRoute;
