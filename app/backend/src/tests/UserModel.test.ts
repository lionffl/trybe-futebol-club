import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/UserModel';
import { validLogin, 
  validUser, 
  invalidLoginPassword, 
  invalidLoginEmail,
  passwordMissing,
  emailMissing, 
} from './mocks';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

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

      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.have.property('token');
    });
  })

  describe('When the request is invalid, API', () => {
    it('should response with 400 status code if email is missing', async () => {
      httpResponse = await chai
        .request(app)
        .post('/login').send(emailMissing)

      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' })
    });

    it('should response with 400 status code if password is missing', async () => {
      httpResponse = await chai
        .request(app)
        .post('/login').send(passwordMissing)

      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' })
    });

    it('should response with 401 status code if email is invalid', async () => {
      httpResponse = await chai
        .request(app)
        .post('/login').send(invalidLoginEmail)

      expect(httpResponse.status).to.equal(401)
      expect(httpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' })
    });

    it('should response with 401 status code if password is invalid', async () => {
      httpResponse = await chai
        .request(app)
        .post('/login').send(invalidLoginPassword)

      expect(httpResponse.status).to.equal(401)
      expect(httpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' })
    });
  });
});
