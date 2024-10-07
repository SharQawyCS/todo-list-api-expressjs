const express = require('express');
const router = express.Router();
const { changePassword } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/update-password', changePassword);

module.exports = router;
