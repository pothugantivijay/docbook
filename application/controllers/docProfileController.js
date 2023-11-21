const DoctorService = require('../services/docProfileCreationService.js');

const createDoctor = async (req, res) => {
    try {
        const savedDoctor = await DoctorService.createDoctorProfile(req.body);
        res.status(201).json({
            message: "Doctor profile created successfully",
            data: savedDoctor
        });
    } catch (error) {
        res.status(400).json({
            message: "Error creating doctor profile",
            error: error.message
        });
    }
};

module.exports = {
    createDoctor
};
