const express = require('express');
const router = express.Router();
const { getUsers, getUserById, addUser, login, protected } = require('../controllers/usersController');
const verifyToken = require('../middlewares/authMiddleware')

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/add', addUser);

router.post('/login', login);

router.get('/protected', protected);

module.exports = router;
