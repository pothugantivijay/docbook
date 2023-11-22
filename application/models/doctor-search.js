
const mongoose = require('mongoose');

const doctorSearchSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  insuranceProviders: {
    type: [String],
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
});

const DoctorSearch = mongoose.model('DoctorSearch', doctorSearchSchema);

module.exports = DoctorSearch;
