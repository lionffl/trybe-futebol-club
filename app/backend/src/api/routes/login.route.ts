import { Router } from 'express';

const loginRoute = Router();

loginRoute.post('/', validateFields, validateCredentials, loginController);

export default loginRoute;
