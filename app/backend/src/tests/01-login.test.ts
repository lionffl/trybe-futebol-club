import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/UserModel';
import {
  validLoginMock,
  validUserMock,
  invalidLoginPasswordMock,
  invalidLoginEmailMock,
  passwordMissingMock,
  emailMissingMock,
} from './mocks/login.mock';
import { Response } from 'superagent';
import { BAD_REQUEST, INVALID_CREDENTIALS } from '../helpers/constants';

chai.use(chaiHttp);

const { expect } = chai;
const should = chai.should();

context('1 - Route /login tests', () => {
  let httpResponse: Response;
  before(() => {
    sinon.stub(UserModel, 'findOne').resolves(validUserMock as UserModel);
  });

  after(() => {
    (UserModel.findOne as sinon.SinonStub).restore();
  });
  describe('When the request is valid, API', () => {
    it('should response with 200 status code and a token', async () => {
      httpResponse = await chai
        .request(app)
        .post('/login').send(validLoginMock)

      should.equal(httpResponse.status, 200);
      expect(httpResponse.body).to.have.property('token');
    });
  })

  describe('When the request is invalid, API', () => {
    it('should response with 400 status code if email is missing', async () => {
      httpResponse = await chai
        .request(app)
        .post('/login').send(emailMissingMock)

      should.equal(httpResponse.status, 400);
      expect(httpResponse.body).to.be.deep.equal(BAD_REQUEST)
    });

    it('should response with 400 status code if password is missing', async () => {
      httpResponse = await chai
        .request(app)
        .post('/login').send(passwordMissingMock)

      should.equal(httpResponse.status, 400);
      expect(httpResponse.body).to.be.deep.equal(BAD_REQUEST)
    });

    it('should response with 401 status code if email is invalid', async () => {
      httpResponse = await chai
        .request(app)
        .post('/login').send(invalidLoginEmailMock)

      should.equal(httpResponse.status, 401);
      expect(httpResponse.body).to.be.deep.equal(INVALID_CREDENTIALS)
    });

    it('should response with 401 status code if password is invalid', async () => {
      httpResponse = await chai
        .request(app)
        .post('/login').send(invalidLoginPasswordMock)

      should.equal(httpResponse.status, 401);
      expect(httpResponse.body).to.be.deep.equal(INVALID_CREDENTIALS)
    });
  });
});

context('2 - Route /login/validate tests', () => {
  let httpResponse: Response;

  before(() => {
    sinon.stub(jwt, 'verify').returns({ data: { email: validUserMock.email } } as any);
    sinon.stub(UserModel, 'findOne').resolves(validUserMock as any);
  });

  after(() => {
    (jwt.verify as sinon.SinonStub).restore();
    (UserModel.findOne as sinon.SinonStub).restore();
  });

  describe('When the request is valid, API', () => {
    it('should response with 200 status code and informs the user`s role', async () => {
      httpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', 'hash')
        .send();
      should.equal(httpResponse.status, 200);
      expect(httpResponse.body).to.be.deep.equal({ role: 'admin' });
    });
  })
});
