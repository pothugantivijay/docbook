const Doctor = require('../models/doctor-search.js');

const createDoctorProfile = async (doctorData) => {
    try {
        const newDoctor = new Doctor(doctorData);
        return await newDoctor.save();
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createDoctorProfile
};
