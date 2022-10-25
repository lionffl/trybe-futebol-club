import { Router } from 'express';
import matchesController from '../controllers/matches.controller';
import 'express-async-errors';
import errorMiddleware from '../middlewares/error.middleware';
import authenticate from '../middlewares/auth.middleware';

const { getMatches, createMatch } = matchesController;

const matchesRoute = Router();

matchesRoute.route('/')
  .get(getMatches)
  .post(authenticate, createMatch);
matchesRoute.use(errorMiddleware);

export default matchesRoute;
