import matchesService from './matches.service';
import * as helper from '../../helpers/functions';
import teamsService from './teams.service';
import { IDataTeamReport } from '../../interfaces/TeamReport';

const leaderboardService = {
  async getLeaderboardFrom(homeOrAway: string) {
    const inProgress = false;
    const matches = await matchesService.getByStatus(inProgress);
    const teams = await teamsService.getAll();
    const performanceReport: IDataTeamReport[] = [];
    teams.forEach((team) => {
      const teamPerformance = helper.getPerformanceByTeamId(matches, team.id, homeOrAway);
      performanceReport.push({ name: team.getDataValue('teamName'), ...teamPerformance });
    });
    const leaderboard = helper.generateLeaderboard(performanceReport);
    return leaderboard;
  },

  async getLeaderboard() {
    const homeLeaderboard = await this.getLeaderboardFrom('homeTeam');
    const awayLeaderboard = await this.getLeaderboardFrom('awayTeam');
    const leaderboard = helper.mergeLeaderboards(homeLeaderboard, awayLeaderboard);
    return leaderboard;
  },
};

export default leaderboardService;
