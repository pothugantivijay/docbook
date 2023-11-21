// doctorService.js
const Doctor = require('../models/doctor-search');

class DoctorService {
  static async searchDoctors(query) {
    try {
      const doctors = await Doctor.find(query);
      return doctors;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DoctorService;
