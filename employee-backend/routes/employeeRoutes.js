const express = require('express');
const employeeController = require('./../controllers/employeeController');

const router = express.Router();

router.route('/').get(employeeController.getAllEmployees);
router.route('/').post(employeeController.addEmployee);
router.route('/:id').delete(employeeController.deleteEmployee);
router.route('/:id').patch(employeeController.updateEmployee);

module.exports = router;