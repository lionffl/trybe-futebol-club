import { Router } from 'express';
import teamsController from '../controllers/teams.controller';
import 'express-async-errors';
import errorMiddleware from '../middlewares/error.middleware';

const { getTeams, getTeamById } = teamsController;

const teamsRoute = Router();

teamsRoute.get('/:id', getTeamById);
teamsRoute.get('/', getTeams);
teamsRoute.use(errorMiddleware);

export default teamsRoute;
