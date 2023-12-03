// services/patientService.js
const Patient = require('../models/patient');

exports.createPatient = async (patientData) => {
  try {
    const newPatient = new Patient(patientData);
    await newPatient.save();
    return { status: 'Success', message: 'Patient Profile Created Successfully' };
  } catch (err) {
    throw new Error(err.message);
  }
};
