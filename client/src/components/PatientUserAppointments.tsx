import React, { useState, useEffect } from "react";
import Appointment from "../interfaces/Appointment";
import DoctorDetails from "../interfaces/Doctor";
import { fetchDoctorDetails } from "../api";

function PatientAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/appts/");
      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const data: Appointment[] = await response.json();
      setAppointments(data);
      console.log(data);

      const updatedAppointments = await Promise.all(
        data.map(async (appointment) => {
          try {
            const doctorDetails = await fetchDoctorDetails(
              appointment.doctorId
            );
            return {
              ...appointment,
              doctorName: doctorDetails.name,
              doctorSpecialty: doctorDetails.specialty,
            };
          } catch (error) {
            console.error(
              `Error fetching doctor details for appointment ${appointment.doctorId}:`,
              error
            );
            return appointment;
          }
        })
      );

      setAppointments(updatedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "UTC", // Adjust this based on your timezone
    };

    return new Date(dateString).toLocaleString("en-US", options);
  };

  useEffect(() => {
    const AOS = require("aos");
    AOS.init({
      duration: 800,
      offset: 200,
      easing: "ease-in-out",
      once: "true",
    });
    return () => {
      AOS.refresh();
    };
  }, []);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
  };
  const getStatus = (startTime: string, endTime: string): string => {
    const currentDateTime = new Date();
    const startDateTime = new Date(startTime);
    const endDateTime = new Date(endTime);

    if (currentDateTime < startDateTime) {
      return "Scheduled";
    } else if (
      currentDateTime >= startDateTime &&
      currentDateTime <= endDateTime
    ) {
      return "In Progress";
    } else {
      return "Completed";
    }
  };

  return (
    <div className="container mt-5 mb-5" data-aos="fade-down">
      <h1 className="mb-4">Your Appointments</h1>
      <table className="table">
        <thead>
          <tr className="table-dark">
            <th scope="col">Doctor Name</th>
            <th scope="col">Specialty</th>
            <th scope="col">Condition</th>
            <th scope="col">Start Time</th>
            <th scope="col">End Time</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>
                <a
                  href={`/doctorprofile/doctor/${appointment.doctorId}`}
                  style={{ fontSize: "1.2em" }}
                >
                  {appointment.doctorName}
                </a>
              </td>
              <td style={{ fontSize: "1.2em" }}>
                {appointment.doctorSpecialty}
              </td>
              <td style={{ fontSize: "1.2em" }}>{appointment.condition}</td>
              <td style={{ fontSize: "1.2em" }}>
                {new Date(appointment.startTime).toLocaleString(
                  "en-US",
                  options
                )}
              </td>
              <td style={{ fontSize: "1.2em" }}>
                {new Date(appointment.endTime).toLocaleString("en-US", options)}
              </td>
              <td>
                {getStatus(
                  new Date(appointment.startTime).toLocaleString(
                    "en-US",
                    options
                  ),
                  new Date(appointment.endTime).toLocaleString("en-US", options)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientAppointments;
