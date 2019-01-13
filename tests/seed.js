const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');

const { Task } = require('./../Models/Task');
const { User } = require('./../Models/User');

const testUser1Id = new ObjectID();
const testUser2Id = new ObjectID();

const testUsers = [{
  _id: testUser1Id,
  email: 'testemail1@mail.com',
  username: 'testuser1',
  password: 'testuser1pass',
  tokens: [{
    type: 'x-auth',
    token: jwt.sign({ _id: testUser1Id, type: 'auth' }, process.env.JWT_SECRET).toString(),
  }],
}, {
  _id: testUser2Id,
  email: 'testemail2@mail.com',
  username: 'testuser2',
  password: 'testuser2pass',
  tokens: [{
    type: 'x-auth',
    token: jwt.sign({ _id: testUser2Id, type: 'auth' }, process.env.JWT_SECRET).toString(),
  }],
}];

const testTasks = [{
  _id: new ObjectID(),
  title: 'This is the first task',
  description: 'This is the first task description',
  assignedTo: null,
  createdBy: testUser1Id,
  complete: true,
  completedAt: 123,
},
{
  _id: new ObjectID(),
  title: 'This is the second task',
  createdBy: testUser1Id,
  assignedTo: testUser2Id,
}];

const setupTestTasks = (done) => {
  Task.deleteMany({}).then(() => Task.insertMany(testTasks)).then(() => {
    done();
  });
};

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
