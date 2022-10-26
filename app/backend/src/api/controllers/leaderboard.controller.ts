import IController from '../../interfaces/Controller';
import leaderboardService from '../services/leaderboard.service';

const leaderboardController: IController = {

  async getHomeTeamLeaderboard(_req, res) {
    const teams = await leaderboardService.getLeaderboardFrom('homeTeam');
    res.status(200).json(teams);
  },

  async getAwayTeamLeaderboard(_req, res) {
    const teams = await leaderboardService.getLeaderboardFrom('awayTeam');
    res.status(200).json(teams);
  },
};

export default leaderboardController;
