const pick = require('lodash/pick');

const { ObjectID } = require('mongodb');
const { User } = require('./../Models/User');

exports.create = (req, res) => {
  const body = pick(req.body, ['email', 'username', 'password']);
  const user = new User(req.body);

  user.save().then(() => user.createToken('auth')).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((error) => {
    res.status(400).send(error);
  });
};

exports.find = (req, res) => {
  res.send(req.user);
};

exports.login = (req, res) => {
  const body = pick(req.body, ['username', 'password']);

  User.findByCredentials(body.username, body.password).then((user) => {
    user.createToken('auth').then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch(e => res.status(400).send());
};
