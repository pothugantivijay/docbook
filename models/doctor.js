const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    qualifications: String,
    biography: String,
    insuranceProviders: [String]
});

module.exports = mongoose.model('Doctor', doctorSchema);
