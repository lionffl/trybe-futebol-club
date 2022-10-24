import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import TeamModel from '../database/models/TeamModel';
import {
  teamsMock, teamMock
} from './mocks/teams.mock';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

context('3 - Route /teams tests', () => {
  let httpResponse: Response;

  describe('When the request is valid, API', () => {
    it('should response with 200 status code and a array of teams', async () => {
      sinon.stub(TeamModel, 'findAll').resolves(teamsMock as unknown as TeamModel[]);
      httpResponse = await chai
        .request(app)
        .get('/teams');

      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.be.deep.equal(teamsMock);
      (TeamModel.findAll as sinon.SinonStub).restore()
    });
  })

  describe('When the request is invalid, API', () => {
    it('should response with 500 status code if an error is thrown', async () => {
      sinon.stub(TeamModel, 'findAll').throws();
      httpResponse = await chai
        .request(app)
        .get('/teams');

      expect(httpResponse.status).to.equal(500)
      expect(httpResponse.body).to.be.deep.equal({ message: 'Unexpected error.' });
      (TeamModel.findAll as sinon.SinonStub).restore()
    });
  })
});

context('4 - Route /teams/:id tests', () => {
  let httpResponse: Response;

  describe('When the request is valid, API', () => {
    it('should response with 200 status code and a team', async () => {
      sinon.stub(TeamModel, 'findByPk').resolves(teamMock as unknown as TeamModel);
      httpResponse = await chai
        .request(app)
        .get('/teams/1');

      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.be.deep.equal(teamMock);
      (TeamModel.findByPk as sinon.SinonStub).restore()
    });
  })

  describe('When the request is invalid, API', () => {
    it('should response with 500 status code if an error is thrown', async () => {
      sinon.stub(TeamModel, 'findByPk').throws();
      httpResponse = await chai
        .request(app)
        .get('/teams');

      expect(httpResponse.status).to.equal(500)
      expect(httpResponse.body).to.be.deep.equal({ message: 'Unexpected error.' });
    });

    it('should response with 404 status code if team id is invalid', async () => {
      (TeamModel.findByPk as sinon.SinonStub).restore()
      sinon.stub(TeamModel, 'findByPk').resolves(null);
      httpResponse = await chai
        .request(app)
        .get('/teams/9999');

      expect(httpResponse.status).to.equal(404)
      expect(httpResponse.body).to.be.deep.equal({ message: 'Team not found.' });
      (TeamModel.findByPk as sinon.SinonStub).restore()
    });
  })
});
