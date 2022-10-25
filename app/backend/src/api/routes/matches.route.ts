import { Router } from 'express';
import matchesController from '../controllers/matches.controller';
import 'express-async-errors';
import errorMiddleware from '../middlewares/error.middleware';

const { getMatches } = matchesController;

const matchesRoute = Router();

matchesRoute.get('/', getMatches);
matchesRoute.use(errorMiddleware);

export default matchesRoute;
