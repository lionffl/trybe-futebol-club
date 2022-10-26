import matchesService from './matches.service';
import * as helper from '../../helpers/functions';

const leaderboardService = {
  async getTeams(homeOrAway: string) {
    const isHome = homeOrAway === 'home';
    const inProgress = false;
    const matches = await matchesService.getByStatus(inProgress);
    const teams = helper.getTotalPointsByTeamId(matches, 16, isHome);
    return teams;
  },
};

export default leaderboardService;
