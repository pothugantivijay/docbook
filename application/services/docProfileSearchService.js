// doctorService.js
const Doctors = require('../models/doctor');

class DoctorService {
  static async searchDoctors(query) {
    try {
      const doctors = await Doctors.find(query);
      return doctors;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DoctorService;
