const userController = require('../controllers/userController');
const express = require('express');

const router = express.Router();

router.post('/register', userController.userRegister);

router.post('/login', userController.userLogin);

router.get('/info', (req,res) => {
    res.json({msg: "Get method"});
})

module.exports = router;