import { Router } from 'express';
import teamsController from '../controllers/teams.controller';

const { getTeams, getTeamById } = teamsController;

const teamsRoute = Router();

teamsRoute.get('/:id', getTeamById);
teamsRoute.get('/', getTeams);

export default teamsRoute;
