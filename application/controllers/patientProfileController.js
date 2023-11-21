// controllers/patientController.js
const patientService = require('../services/patientProfileCreationService');

exports.createPatient = async (req, res) => {
  try {
    const patientData = req.body;
    const response = await patientService.createPatient(patientData);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ status: 'Failed', message: err.message });
  }
};
