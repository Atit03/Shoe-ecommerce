const express = require('express');
const { registerUser, loginUser, getUserDetails, updateUser } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', verifyToken, getUserDetails); // Kiểm tra token trước khi lấy thông tin
router.put('/user', verifyToken, updateUser); // Kiểm tra token trước khi cập nhật thông tin

module.exports = router;
