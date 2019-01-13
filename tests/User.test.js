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

describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', testUsers[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(testUsers[0]._id.toHexString());
        expect(res.body.username).toBe(testUsers[0].username);
      })
      .end(done);
  });

  it('should return a 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /users/login', () => {
  it('should login and return a token', (done) => {
    request(app)
      .post('/users/login')
      .send({
        username: testUsers[1].username,
        password: testUsers[1].password,
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeTruthy();
      })
      .end((err, res) => {
        if (err) return done(err);

        User.findById(testUsers[1]._id).then((user) => {
          expect(user.tokens[0].token).toContain(res.headers['x-auth']);
          done();
        }).catch(e => done(e));
      });
  });

  it('should not login without valid credentials', (done) => {
    request(app)
      .post('/users/login')
      .send({
        username: testUsers[0],
        password: '123',
      })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeFalsy();
      })
      .end((err, res) => {
        if (err) return done(err);

        User.findById(testUsers[1]._id).then((user) => {
          expect(user.tokens.length).toBe(1);
          done();
        }).catch(e => done(e));
      });
  });
});
