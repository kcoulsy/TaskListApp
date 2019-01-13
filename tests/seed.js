const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');

const { Task } = require('./../Models/Task');
const { User } = require('./../Models/User');

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

const setupTestTasks = (done) => {
  Task.deleteMany({}).then(() => Task.insertMany(testTasks)).then(() => {
    done();
  });
};

const testUser1Id = new ObjectID();
const testUser2Id = new ObjectID();

const testUsers = [{
  _id: testUser1Id,
  email: 'testemail1@mail.com',
  username: 'testuser1',
  password: 'testuser1pass',
  tokens: [{
    type: 'x-auth',
    token: jwt.sign({ _id: testUser1Id, type: 'auth' }, 'key').toString(),
  }],
}, {
  _id: testUser2Id,
  email: 'testemail2@mail.com',
  username: 'testuser2',
  password: 'testuser2pass',
  tokens: [{
    type: 'x-auth',
    token: jwt.sign({ _id: testUser2Id, type: 'auth' }, 'key').toString(),
  }],
}];

const setupTestUsers = (done) => {
  User.deleteMany().then(() => {
    const userOne = new User(testUsers[0]).save();
    const userTwo = new User(testUsers[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => {
    done();
  });
};

module.exports = {
  testTasks,
  setupTestTasks,
  testUsers,
  setupTestUsers,
};
