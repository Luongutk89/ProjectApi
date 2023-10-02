const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadFile');
const UserController = require('../controllers/userController');
const authenticateUser = require('../middlewares/authenticateUser');


router.post('/', authenticateUser, upload.single('avatar'), UserController.createUser);
router.get('/', authenticateUser, UserController.getUsers);
router.get('/userId', authenticateUser, UserController.getUserById);
router.put('/:userId', authenticateUser, upload.single('avatar'), UserController.updateUser);
router.delete('/:userId', authenticateUser, UserController.deleteUser);
router.post('/register', upload.single('avatar'), UserController.registerUser);
router.post('/login', UserController.loginUser);
router.patch('/:userId/temporary-delete', authenticateUser, UserController.softDeleteUser);
router.patch('/:userId/restore', authenticateUser, UserController.restoreUser);
module.exports = router;

