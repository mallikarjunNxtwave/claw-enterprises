const todoController = require('../controllers/todoController');
const express = require('express');

const router = express.Router();

router.post('/create', todoController.createTodo);

router.delete('/todos/:id', todoController.deleteTodo);

module.exports = router;