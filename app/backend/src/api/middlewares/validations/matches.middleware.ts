import teamsService from '../../services/teams.service';
import { SAME_TEAM_ERROR, TEAM_NOT_FOUND } from '../../../helpers/constants';
import IMatchbody from '../../../interfaces/Match';
import IMiddleware from '../../../interfaces/Middleware';
import * as helper from '../../../helpers/functions';
import matchesService from '../../services/matches.service';

const matchesValidations: IMiddleware = {

  async validadeQueryString(req, res, next) {
    const noQuery = Object.values(req.query).length === 0;
    if (noQuery) {
      next();
    } else {
      const { inProgress } = req.query;
      if (typeof inProgress === 'string') {
        const isMatchInProgress = helper.convertToBoolean(inProgress);
        const matches = await matchesService.getByStatus(isMatchInProgress);
        res.status(200).json(matches);
      }
    }
  },

  validateOneTeamMatch(req, res, next) {
    const { homeTeam, awayTeam } = req.body as IMatchbody;
    if (homeTeam === awayTeam) {
      res.status(422).json(SAME_TEAM_ERROR);
    } else {
      res.locals.teams = { homeTeam, awayTeam };
      next();
    }
  },

  async validateInvalidTeamMatch(_req, res, next) {
    const { teams } = res.locals;
    const homeTeam = await teamsService.getById(teams.homeTeam);
    const awayTeam = await teamsService.getById(teams.awayTeam);
    if (homeTeam === null || awayTeam === null) {
      res.status(404).json(TEAM_NOT_FOUND);
    } else {
      next();
    }
  },
};

export default matchesValidations;
