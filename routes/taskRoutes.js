const express = require('express');
const router = express.Router();
const {
    createTask,
    getTasks,
    updataTask,
    deleteTask,
} = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', createTask);
router.get('/', getTasks);

module.exports = router;
