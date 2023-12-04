// services/patientService.js
const Patient = require('../models/patient');
const User    = require('../models/login_model');

exports.createPatient = async (patientData) => {
  try {
    const newPatient = new Patient(patientData);
    const patient = await newPatient.save();

    const { username, password } = patientData;
    const user = new User({ username: username, password });
    await user.save();

    return patient;
  } catch (err) {
    throw new Error(err.message);
  }
};
