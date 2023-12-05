const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient_controller');

router.route('/')
    .post(patientController.post);

module.exports = router;