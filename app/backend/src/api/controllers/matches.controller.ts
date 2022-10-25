import IMatchBody from '../../interfaces/Match';
import * as helper from '../../helpers/functions';
import IController from '../../interfaces/Controller';
import matchesService from '../services/matches.service';

const matchesController: IController = {

  async getMatches(req, res) {
    const { inProgress } = req.query;
    if (inProgress) matchesController.getMatchesByStatus(req, res);
    else {
      const matches = await matchesService.getAll();
      res.status(200).json(matches);
    }
  },

  async getMatchesByStatus(req, res) {
    const query = req.query.inProgress as string;
    const isMatchInProgress = helper.convertToBoolean(query) as boolean;
    const matches = await matchesService.getByStatus(isMatchInProgress);
    res.status(200).json(matches);
  },

  async createMatch(req, res) {
    const body = req.body as IMatchBody;
    const { id,
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    } = await matchesService.create(Object.assign(body, { inProgress: true }));
    const response = {
      id, homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
    };
    res.status(201).json(response);
  },
};

export default matchesController;
