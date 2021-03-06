import {
  App,
  chai
} from '../../setup';

describe('POST /api/v1/auth/login', () => {
  it('should return a success status', async () => {
    const res = await chai.request(App)
      .post('/api/v1/auth/login')
      .send({
        username: 'otseobande',
        password: 'bookameal'
      });

    res.should.have.status(200);
  });

  it('should return 401 if credentials are wrong', async () => {
    const res = await chai.request(App)
      .post('/api/v1/auth/login')
      .send({
        username: 'otseobnde',
        password: 'sdf'
      });

    res.should.have.status(401);
    res.body.should.be.deep.equal({
      status: 'error',
      message: 'Username or password is incorrect'
    });
  });

  it('malformed request should return error 400', async () => {
    const res = await chai.request(App)
      .post('/api/v1/auth/login')
      .send({
        username: 'dogo'
      });

    res.should.have.status(400);
  });
});
