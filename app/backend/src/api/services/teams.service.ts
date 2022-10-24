import TeamModel from '../../database/models/TeamModel';

const teamsService = {
  async getAll() {
    const teams = await TeamModel.findAll();
    return teams;
  },
};

export default teamsService;
