import TeamModel from '../../database/models/TeamModel';
import MatchModel from '../../database/models/MatchModel';

const matchesService = {
  async getAll() {
    const matches = await MatchModel.findAll({
      include: [{
        model: TeamModel,
        as: 'teamHome',
      },
      {
        model: TeamModel,
        as: 'teamAway',
      }],
    });
    return matches;
  },
  async getByStatus(inProgress: boolean) {
    const matches = await MatchModel.findAll({
      include: [{
        model: TeamModel,
        as: 'teamHome',
      },
      {
        model: TeamModel,
        as: 'teamAway',
      }],
      where: { inProgress },
    });
    return matches;
  },
};

export default matchesService;
