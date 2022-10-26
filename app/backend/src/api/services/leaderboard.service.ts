import matchesService from './matches.service';
import * as helper from '../../helpers/functions';
import teamsService from './teams.service';
import { IRawTeamperformance } from '../../interfaces/Teamperformance';

const leaderboardService = {
  async getTeams(homeOrAway: string) {
    const inProgress = false;
    const matches = await matchesService.getByStatus(inProgress);
    const teams = await teamsService.getAll();
    const performanceReport: IRawTeamperformance[] = [];
    teams.forEach((team) => {
      const teamPerformance = helper.getPerformanceByTeamId(matches, team.id, homeOrAway);
      performanceReport.push({ name: team.getDataValue('teamName'), ...teamPerformance });
    });
    const leaderboard = helper.generateLeaderboard(performanceReport);
    return leaderboard;
  },
};

export default leaderboardService;
