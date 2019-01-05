const expect = require('expect');
const request = require('supertest');
const {
  app,
} = require('./../server');
const {
  Task,
} = require('./../Models/Task');

beforeEach((done) => {
  Task.deleteOne({}).then(() => {
    done();
  });
});

describe('POST /task', () => {
  it('should create a new TODO', (done) => {
    const title = 'Test Title2';

    request(app).post('/task').send({
      title,
    }).expect(200)
      .expect((res) => {
        expect(res.body.title).toBe(title);
      })
      .end((err, res) => {
        if (err) return done(err);

        Task.find().then((tasks) => {
          expect(tasks.length).toBe(1);
          expect(tasks[0].title).toBe(title);
          done();
        }).catch(e => done(e));
      });
  });

  it('should not create a task with invalid body data', (done) => {
    request(app)
      .post('/task')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        Task.find().then((tasks) => {
          expect(tasks.length).toBe(0);
          done();
        }).catch(e => done(e));
      });
  });
});
