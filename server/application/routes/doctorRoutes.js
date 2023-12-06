const express = require('express');
const router = express.Router();
const DoctorController = require('../controllers/doctor_controller.js');

router.route('/:id')
    .get(DoctorController.get);
router.route('/search')
    .post(DoctorController.search);
router.route('/create')
    .post(DoctorController.create);
router.route('/slot/:Id/slots')
    .get(DoctorController.getSlots);

module.exports = router;
