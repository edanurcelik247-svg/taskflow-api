const express = require('express');
const controller = require('../controllers/taskController');
const validateTask = require('../middlewares/validateTask');

const router = express.Router();

router.get('/', controller.getTasks);
router.get('/:id', controller.getTaskById);
router.post('/', validateTask, controller.createTask);
router.put('/:id', validateTask, controller.updateTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;
