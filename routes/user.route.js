const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// CRUD
router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/roles', userController.createRole)

// 1:M
router.post('/:id/posts', userController.createPostForUser);

// M:M
router.post('/:id/roles', userController.assignRolesToUser);

// 1:1
router.post('/:id/profile', userController.createProfile);

module.exports = router;
