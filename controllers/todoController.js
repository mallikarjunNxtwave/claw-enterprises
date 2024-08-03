const Todo = require('../modules/Todo');
const { ObjectId } = require('mongodb')
const db = require('../index');
const { request } = require('express');



const createTodo = async (request, response) => {
    const { username, todoHeading, todoDescription, completed } = request.body
    const createdDate = new Date();
    try {
        const newTodo = new Todo({
            username,
            todoHeading,
            todoDescription,
            completed,
            createdDate,
        })
        const sample = await newTodo.save();
        response.status(200).json({ message: "Todo Created Successfully", _id: sample._id });
    } catch (error) {
        response.status(400).json({ Error: error.message })
    }
}

const updateTodo = async (request, response) => {
    const { id } = request.params;
    const { todoHeading, todoDescription, completed } = request.body
    try {
        await Todo.findOneAndUpdate({ _id: id }, { todoHeading, todoDescription, completed })
        response.status(200).json({ message: "Todo Updated Successfully" })
    } catch (error) {
        response.status(200).json({ Error: error })
    }
}


const deleteTodo = async (request, response) => {
    const { id } = request.params;
    console.log(id)
    try {
        await Todo.deleteOne({ _id: id })
        response.status(200).json({ msg: "Deleted" })
    } catch (error) {
        response.status(400).json({ msg: error.message })
    }

}

module.exports = { createTodo, deleteTodo, updateTodo };