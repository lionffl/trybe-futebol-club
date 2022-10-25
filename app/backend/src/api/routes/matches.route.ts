import { Router } from 'express';
import matchesController from '../controllers/matches.controller';
import 'express-async-errors';
import errorMiddleware from '../middlewares/error.middleware';
import authenticate from '../middlewares/auth.middleware';
import matchesValidation from '../middlewares/validations/matches.middleware';

const { validateOneTeamMatch, validateInvalidTeamMatch } = matchesValidation;

const { getMatches, createMatch, endMatchById, updateScore } = matchesController;

const matchesRoute = Router();

matchesRoute.patch(
  '/:id/finish',
  authenticate,
  endMatchById,
);

matchesRoute.patch('/:id', updateScore);

matchesRoute.route('/')
  .get(getMatches)
  .post(authenticate, validateOneTeamMatch, validateInvalidTeamMatch, createMatch);

matchesRoute.use(errorMiddleware);

export default matchesRoute;
