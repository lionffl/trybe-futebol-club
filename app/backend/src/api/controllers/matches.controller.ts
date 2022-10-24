import IController from '../../interfaces/Controller';
import matchesService from '../services/matches.service';

const matchesController: IController = {
  async getMatches(_req, res) {
    try {
      const matches = await matchesService.getAll();
      res.status(200).json(matches);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  },
};

export default matchesController;
