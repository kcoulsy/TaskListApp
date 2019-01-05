const express = require('express');

const router = express.Router();

const Task = require('./Task');

router.post('/task', Task.create);
router.get('/tasks', Task.find);
router.get('/tasks/:id', Task.findById);

module.exports = router;
