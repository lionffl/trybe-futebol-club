import { Router } from 'express';
import 'express-async-errors';
import leaderboardController from '../controllers/leaderboard.controller';
import errorMiddleware from '../middlewares/error.middleware';

const leaderboardRoute = Router();

const { getAllTeamsFromHome } = leaderboardController;

leaderboardRoute.get('/home', getAllTeamsFromHome);
leaderboardRoute.use(errorMiddleware);

export default leaderboardRoute;
