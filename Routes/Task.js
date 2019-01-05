const { Task } = require('./../Models/Task');

exports.create = (req, res) => {
  const task = new Task(req.body);

  task.save().then((doc) => {
    res.send(doc);
  }, (error) => {
    res.status(400).send(error);
  });
};

exports.find = (req, res) => {
  Task.find().then((tasks) => {
    res.send({ tasks });
  }, (error) => {
    res.status(400).send(error);
  });
};
