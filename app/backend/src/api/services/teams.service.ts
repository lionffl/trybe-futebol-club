import TeamModel from '../../database/models/TeamModel';

const teamsService = {
  async getAll() {
    const teams = await TeamModel.findAll();
    return teams;
  },

  async getById(id: number) {
    const team = await TeamModel.findByPk(id);
    return team;
  },
};

export default teamsService;
