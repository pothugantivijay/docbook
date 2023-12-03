const DoctorService = require('../services/doctor_service.js');

const get = async (request, response) => {
    try {
        const id = request.params.id;
        const doctorDetails = await DoctorService.getDoctorDetailsWithReviews(id);
        response.status(200).json(doctorDetails);
    }
    catch (error) {
        console.error(error.message);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    get
};
