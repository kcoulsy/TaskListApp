const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');
const {
  app,
} = require('./../server');
const {
  User,
} = require('./../Models/User');
const {
  testUsers,
  setupTestUsers,
} = require('./seed');


beforeEach(setupTestUsers);

describe('POST /users', () => {
  it('should create a user', (done) => {
    const email = 'createusertest@email.com';
    const username = 'createusertestuser';
    const password = 'createusertestpass';
    request(app)
      .post('/users')
      .send({
        email,
        username,
        password,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(email);
        expect(res.body.username).toBe(username);
        expect(res.header['x-auth']).toBeTruthy();
      })
      .end((err) => {
        if (err) return done(err);
        // TODO: Find the user and check it exists and password is hashed
        done();
      });
  });
  it('should return 400 if invalid data is passed', (done) => {
    const email = 'notvalid@';
    const username = 'u';
    const password = '123';
    request(app)
      .post('/users')
      .send({
        email,
        username,
        password,
      })
      .expect(400)
      .end(done);
  });
  it('should not create a user with a duplicate email', (done) => {
    const { email } = testUsers[0];
    const username = 'duplicateemail';
    const password = 'password';
    request(app)
      .post('/users')
      .send({
        email,
        username,
        password,
      })
      .expect(400)
      .end(done);
  });
  it('should not create a user with a duplicate username', (done) => {
    const email = 'thisshouldbevaliid@email.com';
    const { username } = testUsers[0];
    const password = 'password';
    request(app)
      .post('/users')
      .send({
        email,
        username,
        password,
      })
      .expect(400)
      .end(done);
  });
});
