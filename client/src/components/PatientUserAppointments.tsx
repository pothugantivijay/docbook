import React, { useState, useEffect } from "react";
import Appointment from "../interfaces/Appointment";
import DoctorDetails from "../interfaces/Doctor";
import { fetchDoctorDetails } from "../api";

function PatientAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [editedReview, seteditedReview] = useState({
    comment: "",
    rating: "5",
    doctorId: 0,
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  };
  const handleShowModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    seteditedReview({
      comment: "",
      rating: "5",
      doctorId: appointment.doctorId,
    });
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    seteditedReview({
      ...editedReview,
      comment: event.target.value,
    });
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    seteditedReview({
      ...editedReview,
      rating: event.target.value,
    });
  };

  const submitReview = async () => {
    try {
      const response = await fetch("/review/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: editedReview.comment,
          rating: editedReview.rating,
          doctorId: editedReview.doctorId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      const patchResponse = await fetch("/appts/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewed: true,
          _id: selectedAppointment?._id,
        }),
      });

      if (!patchResponse.ok) {
        throw new Error("Failed to patch the appointment");
      }

      console.log("Appointment patched successfully");

      console.log("Review submitted successfully");
      handleCloseModal();
      window.location.reload();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

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
      timeZone: "UTC",
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
    timeZone: "America/New_York",
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
    <>
      <div
        className={`modal fade${showModal ? " show" : ""}`}
        aria-labelledby="contained-modal-title-vcenter"
        style={{
          display: showModal ? "block" : "none",
          backdropFilter: "blur(3px)",
        }}
        tabIndex={-1}
        aria-hidden={!showModal}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="editProfileModal">
                Write Review
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3 text-start fs-5">
                  <label htmlFor="review" className="form-label">
                    Review
                  </label>
                  <textarea
                    className="form-control"
                    id="review"
                    rows={3}
                    value={editedReview.comment}
                    onChange={handleCommentChange}
                  />
                </div>
                <div className="mb-3 text-start fs-5">
                  <label htmlFor="rating" className="form-label">
                    Rating
                  </label>
                  <select
                    className="form-select"
                    id="rating"
                    defaultValue="5"
                    value={editedReview.rating}
                    onChange={handleRatingChange}
                  >
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={submitReview}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
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
                  {new Date(appointment.endTime).toLocaleString(
                    "en-US",
                    options
                  )}
                </td>
                <td>
                  {getStatus(
                    new Date(appointment.startTime).toLocaleString(
                      "en-US",
                      options
                    ),
                    new Date(appointment.endTime).toLocaleString(
                      "en-US",
                      options
                    )
                  )}
                  {getStatus(
                    new Date(appointment.startTime).toLocaleString(
                      "en-US",
                      options
                    ),
                    new Date(appointment.endTime).toLocaleString(
                      "en-US",
                      options
                    )
                  ) === "Completed" &&
                    !appointment.reviewed && (
                      <button
                        type="button"
                        className="btn btn-outline-primary m-4"
                        onClick={() => handleShowModal(appointment)}
                        style={{ fontSize: "0.8em", padding: "0.1em 0.2em" }}
                      >
                        Submit Review
                      </button>
                    )}
                    {getStatus(
                    new Date(appointment.startTime).toLocaleString(
                      "en-US",
                      options
                    ),
                    new Date(appointment.endTime).toLocaleString(
                      "en-US",
                      options
                    )
                  ) === "Completed" &&
                    appointment.reviewed && (
                      <button
                        type="button"
                        className="btn disabled btn-success m-4"
                        onClick={() => handleShowModal(appointment)}
                        style={{ fontSize: "0.8em", padding: "0.1em 0.2em" }}
                      >
                        Review Submitted
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PatientAppointments;
