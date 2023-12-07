const Appointment = require('../models/appointment');

const createAppointment = async (appointmentData) => {
    const appointment = new Appointment(appointmentData);
    return await appointment.save();
};

const getAppointments = async (username) => {
    
    try {
        const appointments = await Appointment.find({ username: username });
        return appointments;
    }
    catch(err) {
        throw err;
    }

}

module.exports = {
    createAppointment,
    getAppointments
};