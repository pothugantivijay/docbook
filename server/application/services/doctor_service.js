const Doctor = require('../models/doctor.js');
const Review = require('../models/review.js');
const Appointment = require('../models/appointment.js');
const mongoose = require('mongoose');

const totalSlotsPerDay = 8;

async function getBookedSlotsCount(id) {
  let startDate = new Date();
  startDate.setHours(0, 0, 0, 0);

  let endDate = new Date();
  endDate.setDate(startDate.getDate() + 28);
  endDate.setHours(23, 59, 59, 999);

  const appointments = await Appointment.find({
    doctorId: id,
    date: { $gte: startDate, $lte: endDate }
  });

  let bookedCountPerDay = {};

  appointments.forEach(appointment => {
    const dayStr = appointment.date.toISOString().split('T')[0];
    bookedCountPerDay[dayStr] = (bookedCountPerDay[dayStr] || 0) + 1;
  });

  return bookedCountPerDay;
}

async function getDoctorDetailsWithReviews(doctorId) {
  try {
    const doctor = await Doctor.findOne({ id: doctorId });

    if (!doctor) {
      throw new Error('Doctor not found');
    }

    const reviews = await Review.find({ doctorId });

    const doctorWithReviews = {
      ...doctor.toObject(),
      reviews,
    };

    return doctorWithReviews;
  } catch (error) {
    throw new Error(`Error getting doctor details: ${error.message}`);
  }
}

async function searchDoctors(criteria) {
  try {
    let query = {};

    // Adding filters to the query if they are provided in the criteria
    if (criteria.specialty) {
      query.specialty = criteria.specialty;
    }
    if (criteria.location) {
      query.location = criteria.location;
    }
    if (criteria.name) {
      // Assuming name is a full or partial match and using a regular expression for flexibility
      query.name = { $regex: criteria.name, $options: 'i' }; // 'i' for case-insensitive
    }

    const doctors = await Doctor.find(query);

    const doctorsWithAvailability = await Promise.all(doctors.map(async (doctor) => {
      console.log(doctor.id);
      const bookedCount = await getBookedSlotsCount(doctor.id);
      console.log(bookedCount);
      let availabilitySummary = {};

      // Calculate available slots for the next 28 days
      for (let i = 0; i < 28; i++) {
        let day = new Date();
        day.setDate(day.getDate() + i);
        const dayStr = day.toISOString().split('T')[0];

        availabilitySummary[dayStr] = totalSlotsPerDay - (bookedCount[dayStr] || 0);
      }

      return {
        ...doctor.toObject(),
        availabilitySummary
      };
    }));

    return doctorsWithAvailability;
  } catch (error) {
    throw new Error(`Error searching doctors: ${error.message}`);
  }
}

async function createDoctor(doctorData) {
  try {
    const newDoctor = new Doctor(doctorData);
    await newDoctor.save();
    return newDoctor;
  } catch (error) {
    throw new Error(`Error creating doctor: ${error.message}`);
  }
}

function formatTime(date) {
  return date.getUTCHours().toString().padStart(2, '0') + ':' + date.getUTCMinutes().toString().padStart(2, '0');
}

async function getSlotDetailsForDay(id, dateString) {
  const workingHoursStart = 9; // 9:00 AM UTC
  const workingHoursEnd = 17; // 5:00 PM UTC

  let startOfDay = new Date(dateString);
  startOfDay.setUTCHours(workingHoursStart, 0, 0, 0);

  let endOfDay = new Date(dateString);
  endOfDay.setUTCHours(workingHoursEnd, 0, 0, 0);

  const appointments = await Appointment.find({
    doctorId: id,
    startTime: { $gte: startOfDay },
    endTime: { $lte: endOfDay }
  });

  let slots = [];
  for (let hour = workingHoursStart; hour < workingHoursEnd; hour++) {
    let slotStart = new Date(dateString);
    slotStart.setUTCHours(hour, 0, 0, 0);

    let slotEnd = new Date(dateString);
    slotEnd.setUTCHours(hour + 1, 0, 0, 0);

    slots.push({ start: slotStart, end: slotEnd });
  }

  let availableSlots = slots.filter(slot =>
    !appointments.some(appointment =>
      appointment.startTime.getTime() === slot.start.getTime() &&
      appointment.endTime.getTime() === slot.end.getTime()
    )
  ).map(slot => ({ start: formatTime(slot.start), end: formatTime(slot.end) }));

  return availableSlots;
}





module.exports = {
  getDoctorDetailsWithReviews,
  searchDoctors,
  createDoctor,
  getSlotDetailsForDay
};
