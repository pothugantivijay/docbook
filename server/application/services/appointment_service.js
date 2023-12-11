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

const getDoctorAppointments = async (id) => {
    
    try {
        const appointments = await Appointment.find({ doctorId: id });
        return appointments;
    }
    catch(err) {
        throw err;
    }

}

const patchAppointment = async(appointmentData) => {
    const { _id, ...updateData } = appointmentData;

    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            _id,
            { $set: updateData },
            { new: true } 
        );

        return updatedAppointment;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createAppointment,
    getAppointments,
    patchAppointment,
    getDoctorAppointments,
};
