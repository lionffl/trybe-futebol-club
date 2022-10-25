import teamsService from '../../services/teams.service';
import { SAME_TEAM_ERROR, TEAM_NOT_FOUND } from '../../../helpers/constants';
import IMatchbody from '../../../interfaces/Match';
import IMiddleware from '../../../interfaces/Middleware';

const matchesValidations: IMiddleware = {
  validateOneTeamMatch(req, res, next) {
    const { homeTeam, awayTeam } = req.body as IMatchbody;
    if (homeTeam === awayTeam) {
      res.status(422).json(SAME_TEAM_ERROR);
    } else {
      next();
    }
  },

  async validateInvalidTeamMatch(req, res, next) {
    const body = req.body as IMatchbody;
    const homeTeam = await teamsService.getById(body.homeTeam);
    const awayTeam = await teamsService.getById(body.awayTeam);
    if (homeTeam === null || awayTeam === null) {
      res.status(404).json(TEAM_NOT_FOUND);
    } else {
      next();
    }
  },
};

export default matchesValidations;
