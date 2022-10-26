import IController from '../../interfaces/Controller';
import leaderboardService from '../services/leaderboard.service';

const leaderboardController: IController = {

  async getAllTeamsFromHome(_req, res) {
    const teams = await leaderboardService.getTeams('homeTeam');
    res.status(200).json(teams);
  },
};

export default leaderboardController;
