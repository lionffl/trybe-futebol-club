import IMatchbody from '../../interfaces/Match';
import IController from '../../interfaces/Controller';
import matchesService from '../services/matches.service';
import { MATCH_FINISHED } from '../../helpers/constants';
import IScoreboard from '../../interfaces/Scoreboard';

const matchesController: IController = {

  async getMatches(_req, res) {
    const matches = await matchesService.getAll();
    res.status(200).json(matches);
  },

  async createMatch(req, res) {
    const body = req.body as IMatchbody;
    const result = await matchesService.create(body);
    const { id, homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = result;
    const match = {
      id, homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
    };
    res.status(201).json(match);
  },

  async endMatchById(req, res) {
    const { id } = req.params;
    await matchesService.endById(+id);
    res.status(200).json(MATCH_FINISHED);
  },

  async updateScore(req, res) {
    const { id } = req.params;
    const scoreBoard = req.body as IScoreboard;
    await matchesService.setScoreById(+id, scoreBoard);
    res.status(200).json({ scoreBoard });
  },
};

export default matchesController;
