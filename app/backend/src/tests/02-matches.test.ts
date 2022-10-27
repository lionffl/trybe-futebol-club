import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import {
  matchesDoneMock, matchesInProgressMock, matchesMock
} from './mocks/matches.mock';
import { Response } from 'superagent';
import { GENERIC_ERROR } from '../helpers/constants';

chai.use(chaiHttp);

const { expect } = chai;
const should = chai.should();

context('5 - Route /matches tests', () => {
  let httpResponse: Response;

  describe('When the request is valid, API', () => {
    it('should response with 200 status code and send an array of matches', async () => {
      sinon.stub(MatchModel, 'findAll').resolves(matchesMock as unknown as MatchModel[]);
      httpResponse = await chai
        .request(app)
        .get('/matches');

      should.equal(httpResponse.status, 200);
      expect(httpResponse.body).to.be.deep.equal(matchesMock);
      (MatchModel.findAll as sinon.SinonStub).restore()
    });
  })

  describe('When the request is invalid, API', () => {
    it('should response with 500 status code if an error is thrown', async () => {
      sinon.stub(MatchModel, 'findAll').throws();
      httpResponse = await chai
        .request(app)
        .get('/matches');

      should.equal(httpResponse.status, 500);
      expect(httpResponse.body).to.be.deep.equal(GENERIC_ERROR);
      (MatchModel.findAll as sinon.SinonStub).restore()
    });
  })
});

context('6 - Route /matches?inProgress', () => {
  let httpResponse: Response;

  describe('When the request is valid, API', () => {
    it('should response with 200 status code and an array with all matches in progress when inProgress = true', async () => {
      sinon.stub(MatchModel, 'findAll').resolves(matchesInProgressMock as unknown as MatchModel[]);
      httpResponse = await chai
        .request(app)
        .get('/matches?inProgress=true');

      should.equal(httpResponse.status, 200);
      expect(httpResponse.body).to.be.deep.equal(matchesInProgressMock);
      (MatchModel.findAll as sinon.SinonStub).restore()
    });
    it('should response with 200 status code and an array with all finished matches when inProgress = false', async () => {
      sinon.stub(MatchModel, 'findAll').resolves(matchesDoneMock as unknown as MatchModel[]);
      httpResponse = await chai
        .request(app)
        .get('/matches?inProgress=false');

      should.equal(httpResponse.status, 200);
      expect(httpResponse.body).to.be.deep.equal(matchesDoneMock);
      (MatchModel.findAll as sinon.SinonStub).restore()
    });
  })

  describe('When the request is invalid, API', () => {
    it('should response with 500 status code if an error is thrown', async () => {
      sinon.stub(MatchModel, 'findAll').throws();
      httpResponse = await chai
        .request(app)
        .get('/matches?inProgress');

      should.equal(httpResponse.status, 500);
      expect(httpResponse.body).to.be.deep.equal(GENERIC_ERROR);
    });
  })
});
