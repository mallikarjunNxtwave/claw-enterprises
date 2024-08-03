const todoController = require('../controllers/todoController');
const express = require('express');

const router = express.Router();

router.post('/todos', todoController.createTodo);

router.post('/todos/:id', todoController.updateTodo);

router.delete('/todos/:id', todoController.deleteTodo);

module.exports = router;