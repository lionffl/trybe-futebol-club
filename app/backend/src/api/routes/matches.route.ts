import { Router } from 'express';
import matchesController from '../controllers/matches.controller';

const { getMatches } = matchesController;

const matchesRoute = Router();

matchesRoute.get('/', getMatches);

export default matchesRoute;
