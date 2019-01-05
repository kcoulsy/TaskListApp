const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');
const {
  app,
} = require('./../server');
const {
  Task,
} = require('./../Models/Task');

const testTasks = [{
  _id: new ObjectID(),
  title: 'This is the first task',
  description: 'This is the first task description',
  assignedTo: 'Nobody',
  complete: true,
  completedAt: 123,
},
{
  _id: new ObjectID(),
  title: 'This is the second task',
}];

beforeEach((done) => {
  Task.remove({}).then(() => Task.insertMany(testTasks)).then(() => {
    done();
  });
});

describe('POST /task', () => {
  it('should create a new TODO', (done) => {
    const title = 'Test Title2';

    request(app)
      .post('/task')
      .send({
        title,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.title).toBe(title);
      })
      .end((err, res) => {
        if (err) return done(err);

        Task.find({ title }).then((tasks) => {
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
          expect(tasks.length).toBe(2);
          done();
        }).catch(e => done(e));
      });
  });
});


describe('GET /tasks', () => {
  it('should get all tasks', (done) => {
    request(app)
      .get('/tasks')
      .expect(200)
      .expect((res) => {
        expect(res.body.tasks.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /tasks/:id', () => {
  it('should get task by id and return the task', (done) => {
    request(app)
      .get(`/tasks/${testTasks[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.task.title).toBe(testTasks[0].title);
      })
      .end(done);
  });

  it('should return a 404 if the id is invalid', (done) => {
    const newID = `${new ObjectID()}randomString1234`;

    request(app)
      .get(`/tasks/${newID}`)
      .expect(404)
      .end(done);
  });

  it('should return at 404 if no task is found', (done) => {
    const newID = new ObjectID();

    request(app)
      .get(`/tasks/${newID}`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /tasks/:id', () => {
  it('should remove a task', (done) => {
    const id = testTasks[0]._id.toHexString();
    request(app)
      .delete(`/tasks/${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.task._id).toBe(id);
      })
      .end((err, res) => {
        if (err) return done(err);

        Task.findById(id).then((task) => {
          expect(task).toBeFalsy();
          done();
        }).catch(error => done(error));
      });
  });

  it('should return a 404 if the id is invalid', (done) => {
    const newID = `${new ObjectID()}randomString1234`;

    request(app)
      .delete(`/tasks/${newID}`)
      .expect(404)
      .end(done);
  });

  it('should return at 404 if no task is found', (done) => {
    const newID = new ObjectID();

    request(app)
      .delete(`/tasks/${newID}`)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /tasks/:id', () => {
  it('should update the task', (done) => {
    const data = {
      title: 'Patch test title',
      description: 'Patch test description',
      complete: true,
      assignedTo: 'Somebody',
    };

    request(app)
      .patch(`/tasks/${testTasks[0]._id.toHexString()}`)
      .send(data)
      .expect(200)
      .expect((res) => {
        expect(res.body.task.title).toBe(data.title);
        expect(res.body.task.description).toBe(data.description);
        expect(res.body.task.complete).toBe(data.complete);
        expect(res.body.task.assignedTo).toBe(data.assignedTo);
        // expect(res.body.task.completedAt).toBeA('number');
      })
      .end(done);
  });

  it('should should clear completedAt when !complete', (done) => {
    request(app)
      .patch(`/tasks/${testTasks[0]._id.toHexString()}`)
      .send({
        complete: false,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.task.completedAt).toBeFalsy();
      })
      .end(done);
  });
});
