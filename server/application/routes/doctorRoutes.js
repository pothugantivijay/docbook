const express = require('express');
const router = express.Router();
const DoctorController = require('../controllers/doctor_controller.js');

router.route('/alldoc')
    .get(DoctorController.fetchall);
router.route('/profile')
    .get(DoctorController.getProfile);
router.route('/search')
    .post(DoctorController.search);
router.route('/create')
    .post(DoctorController.create);
router.route('/slot/:Id/slots')
    .get(DoctorController.getSlots);
router.route('/:id')
    .get(DoctorController.get);
router.route('/get-availability/:Id')
    .get(DoctorController.getDoctorByIdController);

module.exports = router;
