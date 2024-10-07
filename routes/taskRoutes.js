const express = require('express');
const router = express.Router();
const {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', createTask);
router.get('/', getTasks);
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

module.exports = router;
