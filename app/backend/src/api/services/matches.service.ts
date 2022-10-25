import TeamModel from '../../database/models/TeamModel';
import MatchModel from '../../database/models/MatchModel';
import IMatchBody from '../../interfaces/Match';

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
  async create(match: IMatchBody) {
    return MatchModel.create(match);
  },

  async endById(id: number) {
    MatchModel.update({ inProgress: false }, {
      where: {
        id,
      },
    });
  },
};

export default matchesService;
