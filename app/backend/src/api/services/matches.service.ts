import TeamModel from '../../database/models/TeamModel';
import MatchModel from '../../database/models/MatchModel';
import IMatchbody from '../../interfaces/Match';
import IScoreboard from '../../interfaces/Scoreboard';

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

  async create(match: IMatchbody) {
    return MatchModel.create(Object.assign(match, { inProgress: true }));
  },

  async endById(id: number) {
    MatchModel.update({ inProgress: false }, {
      where: {
        id,
      },
    });
  },

  async setScoreById(id: number, scoreBoard: IScoreboard) {
    MatchModel.update({ ...scoreBoard }, {
      where: {
        id,
      },
    });
  },
};

export default matchesService;
