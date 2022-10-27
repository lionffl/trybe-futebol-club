import IController from '../../interfaces/Controller';
import leaderboardService from '../services/leaderboard.service';

const leaderboardController: IController = {

  async getHomeTeamLeaderboard(_req, res) {
    const leaderboard = await leaderboardService.getLeaderboardFrom('homeTeam');
    res.status(200).json(leaderboard);
  },

  async getAwayTeamLeaderboard(_req, res) {
    const leaderboard = await leaderboardService.getLeaderboardFrom('awayTeam');
    res.status(200).json(leaderboard);
  },

  async getLeaderboard(_req, res) {
    const leaderboard = await leaderboardService.getLeaderboard();
    res.status(200).json(leaderboard);
  },
};

export default leaderboardController;
