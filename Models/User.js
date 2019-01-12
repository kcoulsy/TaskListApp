const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 24,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: [{
    type: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  }],
});

UserSchema.methods.createToken = function (type) {
  const token = jwt.sign({
    _id: this._id.toHexString(),
    type,
  }, 'key').toString();

  this.tokens = [...this.tokens, {
    type,
    token,
  }];

  return this.save().then(() => token);
};

UserSchema.statics.findByToken = function (token) {
  let decoded;

  try {
    decoded = jwt.verify(token, 'key');
  } catch (e) {
    return Promise.reject();
  }

  return this.findOne({
    _id: decoded._id,
    'tokens.type': 'auth',
    'tokens.token': token,
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = {
  User,
};
