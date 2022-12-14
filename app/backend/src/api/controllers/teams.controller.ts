import { NOT_FOUND_ERROR } from '../../helpers/constants';
import IController from '../../interfaces/Controller';
import teamsService from '../services/teams.service';

const teamsController: IController = {

  async getTeams(_req, res) {
    const teams = await teamsService.getAll();
    res.status(200).json(teams);
  },

  async getTeamById(req, res) {
    const { id } = req.params;
    const team = await teamsService.getById(+id);
    if (team === null) res.status(404).json(NOT_FOUND_ERROR);
    else {
      res.status(200).json(team);
    }
  },
};

export default teamsController;
