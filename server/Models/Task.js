const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  description: {
    type: String,
    required: false,
    maxlength: 200,
  },
  tag: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 5,
  },
  status: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Number,
    default: null,
  },
});

module.exports = {
  Task,
};
