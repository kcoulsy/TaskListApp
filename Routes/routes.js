const express = require('express');

const router = express.Router();

const Task = require('./Task');
const User = require('./User');

router.post('/task', Task.create);
router.get('/tasks', Task.find);
router.get('/tasks/:id', Task.findById);
router.delete('/tasks/:id', Task.delete);
router.patch('/tasks/:id', Task.update);

router.post('/users', User.create);

module.exports = router;
