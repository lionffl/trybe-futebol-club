import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/UserModel';
import {
  validLogin,
  validUser,
  invalidLoginPassword,
  invalidLoginEmail,
  passwordMissing,
  emailMissing,
} from './mocks/login.mock';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
const should = chai.should();

context('1 - Route /login tests', () => {
  let httpResponse: Response;
  before(() => {
    sinon.stub(UserModel, 'findOne').resolves(validUser as UserModel);
  });

  after(() => {
    (UserModel.findOne as sinon.SinonStub).restore();
  });
  describe('When the request is valid, API', () => {
    it('should response with 200 status code and a token', async () => {
      httpResponse = await chai
        .request(app)
        .post('/login').send(validLogin)

      should.equal(httpResponse.status, 200);
      expect(httpResponse.body).to.have.property('token');
    });
  })

  describe('When the request is invalid, API', () => {
    it('should response with 400 status code if email is missing', async () => {
      httpResponse = await chai
        .request(app)
        .post('/login').send(emailMissing)

      should.equal(httpResponse.status, 400);
      expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' })
    });

    it('should response with 400 status code if password is missing', async () => {
      httpResponse = await chai
        .request(app)
        .post('/login').send(passwordMissing)

      should.equal(httpResponse.status, 400);
      expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' })
    });

    it('should response with 401 status code if email is invalid', async () => {
      httpResponse = await chai
        .request(app)
        .post('/login').send(invalidLoginEmail)

      should.equal(httpResponse.status, 401);
      expect(httpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' })
    });

    it('should response with 401 status code if password is invalid', async () => {
      httpResponse = await chai
        .request(app)
        .post('/login').send(invalidLoginPassword)

      should.equal(httpResponse.status, 401);
      expect(httpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' })
    });
  });
});

context('2 - Route /login/validate tests', () => {
  let httpResponse: Response;

  before(() => {
    sinon.stub(jwt, 'verify').returns({ data: { email: validUser.email } } as any);
    sinon.stub(UserModel, 'findOne').resolves(validUser as any);
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
