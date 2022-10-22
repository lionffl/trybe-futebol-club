import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../app';
import UserModel from '../database/models/UserModel';
import { validLogin, validUser, invalidUser } from './mocks';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

context('Route /login tests', () => {
  let httpResponse: Response;

  describe('When the request is valid', () => {
    before(() => {
      sinon.stub(UserModel, 'findOne').resolves(validUser as UserModel);
    });

    after(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
    });


    it('should return 200', async () => {
      httpResponse = await chai
        .request(app)
        .post('/login').send(validLogin)

      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.have.property('token');
    });

    describe('When the request is invalid', () => {

      it('should return 400 if email is missing', async () => {
        httpResponse = await chai
          .request(app)
          .post('/login').send({ password: '1234565123123' })

        expect(httpResponse.status).to.equal(400)
        expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' })
      });

      it('should return 400 if password is missing', async () => {
        httpResponse = await chai
          .request(app)
          .post('/login').send({ email: 'email@gmail.com' })

        expect(httpResponse.status).to.equal(400)
        expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' })
      });
    });
  });
});
