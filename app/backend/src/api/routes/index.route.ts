import { Router } from 'express';
import loginRoute from './login.route';
import teamsRoute from './teams.route';
import matchesRoute from './matches.route';
import leaderboardRoute from './leaderboard.route';
import allRoute from './all.route';

const routes = Router();

routes.use('/login', loginRoute);
routes.use('/teams', teamsRoute);
routes.use('/matches', matchesRoute);
routes.use('/leaderboard', leaderboardRoute);
routes.use('*', allRoute);

export default routes;
