const isBoolean = require('lodash/isBoolean');
const pick = require('lodash/pick');

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

exports.delete = (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Task.findOneAndDelete({ _id: id }).then((task) => {
    if (!task) {
      res.status(404).send();
    }
    res.send({ task });
  }).catch((error) => {
    res.status(400).send();
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const body = pick(req.body, ['title', 'description', 'assignedTo', 'complete']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (isBoolean(body.complete) && body.complete) {
    body.completedAt = new Date().getTime();
  } else {
    body.completedAt = null;
    body.complete = false;
  }

  Task.findOneAndUpdate({ _id: id }, { $set: body }, { new: true }).then((task) => {
    if (!task) {
      res.status(404).send();
    }
    res.send({ task });
  }).catch((error) => {
    res.status(400).send();
  });
};
