const express = require('express');

const router = express.Router();

const Task = require('./Task');

router.post('/task', Task.create);
router.get('/tasks', Task.find);

module.exports = router;
