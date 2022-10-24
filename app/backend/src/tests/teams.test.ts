import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import TeamModel from '../database/models/TeamModel';
import { teams
} from './mocks/teams.mock';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

context('3 - Route /teams tests', () => {
  let httpResponse: Response;

  describe('When the request is valid, API', () => {
    it('should response with 200 status code and a array of teams', async () => {
      sinon.stub(TeamModel, 'findAll').resolves(teams as unknown as TeamModel[]);
      httpResponse = await chai
        .request(app)
        .get('/teams');

      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.be.deep.equal(teams);
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
