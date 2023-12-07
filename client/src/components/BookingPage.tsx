import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Doctor } from '../types/DoctorTypes';
import { createAppointment, fetchDoctorDetails } from '../api';

interface BookingFormData {
    name: string;
    email: string;
    condition: string;
    insuranceProvider: string;
    insuranceNumber: string;
}

const BookingPage: React.FC = () => {
    const [formData, setFormData] = useState<BookingFormData>({
        name: '',
        email: '',
        condition: '',
        insuranceProvider: '',
        insuranceNumber: ''
    });
    const location = useLocation();
    const { doctorId, slot, date } = location.state || {};

    const [doctor, setDoctor] = useState<Doctor | null>(null);

    useEffect(() => {
        const fetchAndSetDoctor = async () => {
            if (doctorId) {
                const doctorData = await fetchDoctorDetails(doctorId);
                setDoctor(doctorData);
            }
        };

        fetchAndSetDoctor();
    }, [doctorId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function combineDateAndTimeUTC(dateString: string, timeString: string) {
        const [hours, minutes] = timeString.split(':').map(Number);
        const date = new Date(dateString);

        // Convert the date to UTC
        date.setUTCHours(hours, minutes, 0, 0);

        return date;
    }



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formattedDate = (typeof date === 'string') ? date : date.toISOString();

        const appointmentData = {
            ...formData,
            doctorId: doctorId,
            startTime: combineDateAndTimeUTC(formattedDate, slot.start),
            endTime: combineDateAndTimeUTC(formattedDate, slot.end),
            date: formattedDate
        };

        try {
            const result = await createAppointment(appointmentData);
            console.log('Appointment created:', result);
            // Handle success - redirect or show a success message
        } catch (error) {
            console.error('Error creating appointment:', error);
            // Handle errors - show an error message to the user
        }
    };




    return (
        <div className="container my-5">
            {doctor && (
                <div className="mb-4">
                    <h2 className="mb-3">Booking Appointment with {doctor.name}</h2>
                    <p><strong>Specialty:</strong> {doctor.specialty}</p>
                    <p><strong>Location:</strong> {doctor.address}</p>
                    <p><strong>Selected Slot:</strong> {slot.start} - {slot.end} </p>
                    {/* Other doctor details */}
                </div>
            )}
            <h3 className="mb-4">Appointment Details</h3>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="name">Your Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <div className="invalid-feedback">
                            Name is required.
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <div className="invalid-feedback">
                            Please enter a valid email.
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="condition">Condition Description</label>
                    <textarea
                        className="form-control"
                        id="condition"
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">
                        Please describe your condition.
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="insuranceProvider">Insurance Provider</label>
                        <input
                            type="text"
                            className="form-control"
                            id="insuranceProvider"
                            name="insuranceProvider"
                            value={formData.insuranceProvider}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="insuranceNumber">Insurance Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="insuranceNumber"
                            name="insuranceNumber"
                            value={formData.insuranceNumber}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button className="btn btn-primary" type="submit">Book Appointment</button>
            </form>
        </div>
    );
};

export default BookingPage;
