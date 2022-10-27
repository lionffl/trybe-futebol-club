import * as sinon from 'sinon';
import * as chai from 'chai';
import { createLeaderboard, getGoalsReport, getPerformanceByTeamId, sumPerformances, generateLeaderboard, mergeLeaderboards } from '../helpers/functions';
import { endedMatchesMock } from './mocks/matches.mock';
import matchesServices from '../api/services/matches.service'
import MatchModel from '../database/models/MatchModel';
import { awayReportMock, consolidatedReportMock, dataReportMock, homeReportMock, homeLeaderboardMock, leaderboardMock, teamReportMock, awayLeaderboardMock } from './mocks/leaderboard.mock';

const { expect } = chai;

context('0 - Helpers functions tests', () => {
  describe('sumPerformances()', () => {
    it('expect receive two reports of the same team, one with home, other with away results, and return a consolidated report ', async () => {
      const consolidatedReport = sumPerformances(homeReportMock, awayReportMock);

      expect(consolidatedReport).to.be.deep.equal(consolidatedReportMock);
    })
  })
  describe('generateLeaderboard()', () => {
    it('expect receive an array of teams data and return a leaderboard', async () => {
      const leaderboard = generateLeaderboard(dataReportMock);

      expect(leaderboard).to.be.deep.equal(homeLeaderboardMock);
    })
  })
  describe('createLeaderboard()', () => {
    it('expect receive an unordered array of teams report and return a new array sorted by rank order', async () => {
      const leaderboard = createLeaderboard(teamReportMock);

      expect(leaderboard).to.be.deep.equal(homeLeaderboardMock);
    })
  })
  describe('mergeLeaderboard()', () => {
    it('expect receive two leaderboards, one with home, other with away rank, and return consolidated leaderboard', async () => {
      const leaderboard = mergeLeaderboards(homeLeaderboardMock, awayLeaderboardMock);
      expect(leaderboard).to.be.deep.equal(leaderboardMock);
    })
  })
  describe('getGoalsReport()', () => {
    it('expect return an object with goalsFavor and goalsOwn', async () => {
      sinon.stub(MatchModel, 'findAll').resolves(endedMatchesMock as unknown as MatchModel[]);
      const matches = await matchesServices.getByStatus(false);
      
      const report = getGoalsReport(matches, 'homeTeamGoals', 'awayTeamGoals');

      expect(report).to.have.property('goalsFavor');
      expect(report).to.have.property('goalsOwn');
      (MatchModel.findAll as sinon.SinonStub).restore()
    })
  })
  describe('getPerformanceByTeamId()', () => {
    it('expect return an object with performance data to generate a team report', async () => {
      sinon.stub(MatchModel, 'findAll').resolves(endedMatchesMock as unknown as MatchModel[]);
      const matches = await matchesServices.getByStatus(false);
      
      const performanceData = getPerformanceByTeamId(matches, 1, 'homeTeamGoals');
    
      expect(performanceData).to.have.property('draws');
      expect(performanceData).to.have.property('games');
      expect(performanceData).to.have.property('points');
      expect(performanceData).to.have.property('wins');
      expect(performanceData).to.have.property('goalsReport');
      expect(performanceData.goalsReport).to.have.property('goalsFavor');
      expect(performanceData.goalsReport).to.have.property('goalsOwn');
      (MatchModel.findAll as sinon.SinonStub).restore()
    })
  })
})