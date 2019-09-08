let mongoose = require('mongoose');

let taskSchema = mongoose.Schema({
    id: {
        type: Number,
        default: Math.round(Math.random()*1000),
        require: true
    },
    name: {
        type: String,
        require: true
    },
    assignTo: {
        type: Number,
        require: true
    },
    dueDate: {
        type: Date,
        default: Date.now(),
        require: true
    },
    status: {
        type: String,
        require: true
    },
    desc: {
        type: String
    }
});

let taskModel = mongoose.model("Tasks", taskSchema);

module.exports = taskModel;