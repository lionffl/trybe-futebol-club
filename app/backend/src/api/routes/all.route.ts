import { Request, Response, Router } from 'express';
import 'express-async-errors';

import errorMiddleware from '../middlewares/error.middleware';

const allRoute = Router();

allRoute.all('/', (req: Request, res: Response) => {
  res.status(404).send({
    status: 404,
    error: `The URL "${req.originalUrl}" could not be reached or does not exist.
  Please, try one of the follow: /matches, /teams, /login, /leaderboard`,
  });
});

allRoute.use(errorMiddleware);
export default allRoute;
