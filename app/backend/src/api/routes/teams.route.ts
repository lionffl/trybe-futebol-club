import { Router } from 'express';
import teamsController from '../controllers/teams.controller';

const teamsRoute = Router();

const { getTeams } = teamsController;

teamsRoute.get('/', getTeams);
// teamsRoute.get('/:id', getTeamById);

export default teamsRoute;
