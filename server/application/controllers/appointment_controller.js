const AppointmentService = require('../services/appointment_service');

const createAppointment = async (req, res) => {
    try {
        const appointment = await AppointmentService.createAppointment(req.body);
        res.status(201).json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating appointment' });
    }
};


module.exports = {
    createAppointment,
};
