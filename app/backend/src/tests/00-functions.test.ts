import * as sinon from 'sinon';
import * as chai from 'chai';
import { getGoalsReport } from '../helpers/functions';
import { endedMatchesMock } from './mocks/matches.mock';
import matchesServices from '../api/services/matches.service'
import MatchModel from '../database/models/MatchModel';

const { expect } = chai;
// const should = chai.should();

context('0 - Helpers functions tests', () => {
  describe('getGoalsReport()', () => {
    it('should return an object with goalsFavor and goalsOwn', async () => {
      sinon.stub(MatchModel, 'findAll').resolves(endedMatchesMock as unknown as MatchModel[]);
      const matches = await matchesServices.getByStatus(false);
      
      const report = getGoalsReport(matches, 'homeTeamGoals', 'awayTeamGoals');

      expect(report).to.have.property('goalsFavor');
      expect(report).to.have.property('goalsOwn');
      (MatchModel.findAll as sinon.SinonStub).restore()
    })
  })
})