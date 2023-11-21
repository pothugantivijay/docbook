// doctorController.js
const DoctorService = require('../services/docProfileSearchService');

class DoctorController {
  static async searchDoctors(req, res) {
    try {
      const query = req.query;
      const doctors = await DoctorService.searchDoctors(query);
      res.json(doctors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = DoctorController;
