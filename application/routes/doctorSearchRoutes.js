// doctorRoute.js
const express = require('express');
const DoctorController = require('../controllers/docSearchController');

const router = express.Router();

router.get('/search-doctors', DoctorController.searchDoctors);

module.exports = router;
