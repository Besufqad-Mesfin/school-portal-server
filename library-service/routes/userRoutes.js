const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.post('/register', userController.registerStudent);
router.post('/login', userController.loginUser);
router.get('/history', authMiddleware, userController.getStudentHistory);
router.post('/block', authMiddleware, userController.blockStudent);

module.exports = router;