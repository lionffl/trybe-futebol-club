import { GENERIC_ERROR } from '../../helpers/constants';
import convertoToBoolean from '../../helpers/convertToBoolean';
import IController from '../../interfaces/Controller';
import matchesService from '../services/matches.service';

const matchesController: IController = {
  async getMatches(req, res) {
    const { inProgress } = req.query;
    if (inProgress) matchesController.getMatchesByStatus(req, res);
    else {
      try {
        const matches = await matchesService.getAll();
        res.status(200).json(matches);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json(GENERIC_ERROR);
        }
      }
    }
  },
  async getMatchesByStatus(req, res) {
    const query = req.query.inProgress as string;
    const isMatchInProgress = convertoToBoolean(query) as boolean;
    try {
      const matches = await matchesService.getByStatus(isMatchInProgress);
      res.status(200).json(matches);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json(GENERIC_ERROR);
      }
    }
  },
};

export default matchesController;
