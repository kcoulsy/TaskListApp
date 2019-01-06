const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Tasks', {
  useCreateIndex: true,
  useNewUrlParser: true,
});

module.exports = {
  mongoose,
};
