const { ObjectID } = require('mongodb');
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

exports.findById = (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.sendStatus(404);
  } 
  Task.findById(id).then((task) => {
    if (!task) {
      res.sendStatus(404);
    }
    res.send({ task });
  }).catch((error) => {
    res.status(400).send();
  });
};
