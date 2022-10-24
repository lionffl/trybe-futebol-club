import IController from '../../interfaces/Controller';
import teamsService from '../services/teams.service';

const teamsController: IController = {
  async getTeams(_req, res) {
    try {
      const teams = await teamsService.getAll();
      res.status(200).json(teams);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: 'Unexpected error.' });
      }
    }
  },
};

export default teamsController;
