const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    todoHeading: {
        type: String,
    },
    todoDescription:{
        type: String,

    },
    createdDate: {
        type: Date,
        required: true,
    },
    compled:{
        type: Boolean,
        required: true
    }
});

const ToDo = mongoose.model('todo', todoSchema);

module.exports = ToDo;