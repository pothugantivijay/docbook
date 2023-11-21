const express = require('express');
const router = express.Router();
const DoctorController = require('../controllers/docProfileController');

// POST endpoint for creating a doctor profile
router.post('/doctors', DoctorController.createDoctor);


module.exports = router;
