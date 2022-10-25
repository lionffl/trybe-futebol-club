import teamsService from '../../services/teams.service';
import { SAME_TEAM_ERROR, TEAM_NOT_FOUND } from '../../../helpers/constants';
import IMatchBody from '../../../interfaces/Match';
import IMiddleware from '../../../interfaces/Middleware';

const matchesValidations: IMiddleware = {
  validateOneTeamMatch(req, res, next) {
    const { homeTeam, awayTeam } = req.body as IMatchBody;
    if (homeTeam === awayTeam) {
      res.status(422).json(SAME_TEAM_ERROR);
    } else {
      res.locals.teams = { homeTeam, awayTeam };
      next();
    }
  },

  async validateInvalidTeamMatch(_req, res, next) {
    const { teams } = res.locals;
    const homeTeam = teamsService.getById(teams.homeTeam);
    const awayTeam = teamsService.getById(teams.awayTeam);
    if (homeTeam === null || awayTeam === null) {
      res.status(404).json(TEAM_NOT_FOUND);
    } else {
      next();
    }
  },
};

export default matchesValidations;
