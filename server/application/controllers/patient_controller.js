const patientService = require('../services/patient_service');

const post = async (request, response) => {
  try {
    console.log('Received POST request to /patient');
      const patientData = request.body;
      console.log(patientData);

      const patient = await patientService.createPatient(patientData);
      response.status(200).json(patient);
  } catch (error) {
      console.error('Error during login:', error);
      response.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  post,
};