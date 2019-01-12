const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (error, hash) => {
        this.password = hash;
        next();
      });
    });
  } else {
    next();
  }
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

UserSchema.statics.findByCredentials = function (username, password) {
  return this.findOne({ username }).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = {
  User,
};
