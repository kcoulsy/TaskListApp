const express = require('express');
const bodyParser = require('body-parser');

const { mongooose } = require('./db/mongoose');
const { Task } = require('./Models/Task');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.post('/task', (req, res) => {
  const task = new Task(req.body);

  task.save().then((doc) => {
    res.send(doc);
  }, (error) => {
    res.status(400).send(error);
  });
});

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Console running on port ${PORT}`);
  /* eslint-enable no-console */
});


module.exports = { app };
