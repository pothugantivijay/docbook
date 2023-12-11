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

const getProfile = async (request, response) => {
    try {
        console.log('recieved profile request');
        const doctorDetails = await DoctorService.getDoctorProfile(request.session.username);
        response.status(200).json(doctorDetails);
    }
    catch (error) {
        console.error(error.message);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

const search = async (request, response) => {
    try {
        const searchCriteria = request.body; // Assuming the criteria are sent in the request body
        const doctorResults = await DoctorService.searchDoctors(searchCriteria);
        response.status(200).json(doctorResults);
    }
    catch (error) {
        console.error(error.message);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

const fetchall = async (req, res) => {
    try {
        const result = await DoctorService.allDoctors(); 
        res.status(200).json({ result });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

const create = async (req, res) => {
    try {
        const doctorData = req.body;
        const newDoctor = await DoctorService.createDoctor(doctorData);
        res.status(201).json(newDoctor);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

const getSlots = async (req, res) => {
    try {
        const doctorId = req.params.Id; // Use 'Id' to match the route parameter
        const date = req.query.date; // Date as a query parameter
        const slotDetails = await DoctorService.getSlotDetailsForDay(doctorId, new Date(date));
        res.status(200).json(slotDetails);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

async function getDoctorByIdController(req, res) {
    try {
        const doctorId = req.params.Id; // Get the doctor ID from request parameters
        const doctor = await DoctorService.getDoctorById(doctorId);

        if (!doctor) {
            return res.status(404).send('Doctor not found');
        }

        res.json(doctor);
    } catch (error) {
        console.error('Error in getDoctorByIdController:', error);
        res.status(500).send(error.message);
    }
}


module.exports = {
    get,
    search,
    create,
    fetchall,
    getSlots,
    getProfile,
    getDoctorByIdController
};