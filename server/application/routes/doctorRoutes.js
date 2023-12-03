const express = require('express');
const router = express.Router();
const DoctorController = require('../controllers/doctor_controller.js');

router.route('/:id')
    .get(DoctorController.get);


module.exports = router;
