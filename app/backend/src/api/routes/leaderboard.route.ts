import { Router } from 'express';
import 'express-async-errors';
import leaderboardController from '../controllers/leaderboard.controller';
import errorMiddleware from '../middlewares/error.middleware';

const leaderboardRoute = Router();

const { getHomeTeamLeaderboard, getAwayTeamLeaderboard, getLeaderboard } = leaderboardController;

leaderboardRoute.get('/home', getHomeTeamLeaderboard);
leaderboardRoute.get('/away', getAwayTeamLeaderboard);
leaderboardRoute.get('/', getLeaderboard);
leaderboardRoute.use(errorMiddleware);

export default leaderboardRoute;
