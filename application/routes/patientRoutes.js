const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientProfileController');

router.post('/createpatient', patientController.createPatient);

module.exports = router;