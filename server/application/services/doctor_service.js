const Doctor = require('../models/doctor.js'); 
const Review = require('../models/review.js'); 

async function getDoctorDetailsWithReviews(doctorId) {
  try {
    const doctor = await Doctor.findOne({ id: doctorId });

    if (!doctor) {
      throw new Error('Doctor not found');
    }

    const reviews = await Review.find({ doctorId });

    const doctorWithReviews = {
      ...doctor.toObject(),
      reviews,
    };

    return doctorWithReviews;
  } catch (error) {
    throw new Error(`Error getting doctor details: ${error.message}`);
  }
}

module.exports = {
    getDoctorDetailsWithReviews
};