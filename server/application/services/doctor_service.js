const Doctor = require('../models/doctor.js');
const Review = require('../models/review.js');
const Appointment = require('../models/appointment.js');
const mongoose = require('mongoose');

const totalSlotsPerDay = 8;

function convertToLocalTime(date, offset) {
  return new Date(date.getTime() - offset * 60 * 60 * 1000);
}

async function getBookedSlotsCount(id) {
  const utcOffsetForEST = 5; // EST is UTC-5

  // Set startDate to the current date in EST
  let startDate = convertToLocalTime(new Date(), utcOffsetForEST);
  startDate.setHours(0, 0, 0, 0);

  // Set endDate to 28 days later
  let endDate = new Date(startDate);
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
        let day = convertToLocalTime(new Date(), 5);
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
  const estToUtcOffset = 5; // EST is UTC-5
  const workingHoursStart = 9; // 9:00 AM EST
  const workingHoursEnd = 17; // 5:00 PM EST

  // Convert EST working hours to UTC
  let startOfDayUtc = new Date(dateString);
  startOfDayUtc.setUTCHours(workingHoursStart + estToUtcOffset, 0, 0, 0);

  let endOfDayUtc = new Date(dateString);
  endOfDayUtc.setUTCHours(workingHoursEnd + estToUtcOffset, 0, 0, 0);

  // Fetch appointments within the UTC time range
  const appointments = await Appointment.find({
    doctorId: id,
    startTime: { $gte: startOfDayUtc },
    endTime: { $lte: endOfDayUtc }
  });

  let slots = [];
  for (let hour = workingHoursStart; hour < workingHoursEnd; hour++) {
    let slotStartUtc = new Date(dateString);
    slotStartUtc.setUTCHours(hour + estToUtcOffset, 0, 0, 0);

    let slotEndUtc = new Date(dateString);
    slotEndUtc.setUTCHours(hour + 1 + estToUtcOffset, 0, 0, 0);

    slots.push({ start: slotStartUtc, end: slotEndUtc });
  }

  let availableSlots = slots.filter(slot =>
    !appointments.some(appointment =>
      appointment.startTime <= slot.start &&
      appointment.endTime >= slot.end
    )
  ).map(slot => ({
    start: slot.start.toISOString(),
    end: slot.end.toISOString()
  }));

  return availableSlots;
}


module.exports = {
  getDoctorDetailsWithReviews,
  searchDoctors,
  createDoctor,
  getSlotDetailsForDay
};
