const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    description: {
        type: String,
        required: false,
        maxlength: 200
    },
    createdBy: {
        type: String
    },
    assignedTo: {
        type: String
    },
    complete: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});
module.exports = {
    Task
}