const Appointment = require('../models/appointment');

const createAppointment = async (appointmentData) => {
    const appointment = new Appointment(appointmentData);
    return await appointment.save();
};

module.exports = {
    createAppointment
};
