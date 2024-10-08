const express = require('express');
const router = express.Router();
const {
    changePassword,
    deleteAccount,
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/update-password', changePassword);
router.post('/delete-account', deleteAccount);

module.exports = router;
