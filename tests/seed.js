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

module.exports = {
  testTasks,
  setupTestTasks,
};
