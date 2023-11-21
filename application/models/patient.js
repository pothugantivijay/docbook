const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Username: String,
  Password: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  Address: String,
  Dob: {
    type: Date,
    required: true,
  },
  Height: Number,
  Weight: Number,
});

module.exports = mongoose.model('Patient', patientSchema);
