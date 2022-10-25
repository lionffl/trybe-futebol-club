import TeamModel from '../../database/models/TeamModel';
import MatchModel from '../../database/models/MatchModel';

const matches = {
  include: [{
    model: TeamModel,
    as: 'teamHome',
  },
  {
    model: TeamModel,
    as: 'teamAway',
  }],
};

const matchesService = {
  async getAll() {
    return MatchModel.findAll(matches);
  },
  async getByStatus(inProgress: boolean) {
    return MatchModel.findAll(Object.assign(matches, { where: { inProgress } }));
  },
};

export default matchesService;
