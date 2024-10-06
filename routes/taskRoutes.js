const express = require('express');
const router = express.Router();
const {
    createTask,
    getTask,
    updataTask,
    deleteTask,
} = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', createTask);

module.exports = router;
