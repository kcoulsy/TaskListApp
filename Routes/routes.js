const express = require('express');

const router = express.Router();

const { Authentication } = require('./../middleware/Authentication');
const Task = require('./Task');
const User = require('./User');

router.post('/task', Authentication, Task.create);
router.get('/tasks', Task.find);
router.get('/tasks/me', Authentication, Task.find);
router.get('/tasks/:id', Task.findById);
router.delete('/tasks/:id', Authentication, Task.delete);
router.patch('/tasks/:id', Authentication, Task.update);

router.post('/users', User.create);
router.post('/users/find', User.find);
router.get('/users/me', Authentication, User.findSelf);
router.post('/users/login', User.login);
router.delete('/users/me/token', Authentication, User.delete);

module.exports = router;
