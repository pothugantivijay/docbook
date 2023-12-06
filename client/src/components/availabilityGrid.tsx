import React, { useState } from 'react';
import { BookedSlot, Doctor, DoctorAvailability } from '../types/DoctorTypes';
import '../Css/availabilityGrid.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface AvailabilityGridProps {
    availability: DoctorAvailability;
    doctor: Doctor;
}


interface SelectedDay {
    date: Date;
    slots: BookedSlot[];
}

const AvailabilityGrid: React.FC<AvailabilityGridProps> = ({ availability, doctor }) => {
    const navigate = useNavigate(); // For React Router v6
    const [selectedDay, setSelectedDay] = useState<SelectedDay | null>(null);
    const [startDate, setStartDate] = useState(new Date());
    const workingHoursStart = 9; // Clinic starts at 9:00 AM
    const workingHoursEnd = 17; // Clinic closes at 5:00 PM (17:00 in 24-hour format)
    const maxRangeInDays = 28; // 4 weeks


    const goToNextTwoWeeks = () => {
        let newStartDate = new Date(startDate);
        newStartDate.setDate(newStartDate.getDate() + 14);

        // Check if the new start date exceeds the maximum range
        if (newStartDate.getTime() - startDate.getTime() <= maxRangeInDays * 24 * 60 * 60 * 1000) {
            setStartDate(newStartDate);
        }
    };

    const getNextTwoWeeksDates = (start: Date): Date[] => {
        let dates: Date[] = [];
        for (let i = 0; i < 14; i++) {
            let date = new Date(start);
            date.setDate(date.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const goToPreviousTwoWeeks = () => {
        let newStartDate = new Date(startDate);
        newStartDate.setDate(newStartDate.getDate() - 14);

        // Ensure the new start date does not go before the initial start date
        if (newStartDate >= new Date()) {
            setStartDate(newStartDate);
        }
    };

    const getAvailableSlots = (bookedSlots: BookedSlot[]): BookedSlot[] => {
        // Convert 12-hour format to 24-hour for comparison
        const convertTo24Hour = (time: string) => {
            const matches = time.match(/\d+/g);
            const periodMatch = time.match(/AM|PM/i);

            if (!matches || matches.length < 2 || !periodMatch) {
                throw new Error(`Invalid time format: ${time}`);
            }

            let [hours, minutes] = matches;
            const period = periodMatch[0];

            hours = (period === 'PM' && hours !== '12') ? String(parseInt(hours, 10) + 12) : hours;
            hours = (period === 'AM' && hours === '12') ? '00' : hours;

            return `${hours.padStart(2, '0')}:${minutes}`;
        };


        // Create all hourly slots
        let allSlots: BookedSlot[] = [];
        for (let hour = workingHoursStart; hour < workingHoursEnd; hour++) {
            const startHour = hour < 10 ? `0${hour}` : hour.toString();
            const endHour = hour + 1 < 10 ? `0${hour + 1}` : (hour + 1).toString();
            allSlots.push({ start: `${startHour}:00`, end: `${endHour}:00` });
        }

        // Filter out booked slots
        let availableSlots = allSlots.filter(slot =>
            !bookedSlots.some(booked => {
                const bookedStart24h = convertTo24Hour(booked.start);
                const bookedEnd24h = convertTo24Hour(booked.end);
                return slot.start === bookedStart24h && slot.end === bookedEnd24h;
            })
        );

        return availableSlots;
    };


    const handleCellClick = (date: Date, dayLong: string) => {
        const slots = getAvailableSlots(availability[dayLong.toLowerCase()] || []);
        setSelectedDay({ date, slots });
    };



    const handleBookingClick = (doctorId: number, slot: string) => {
        navigate('/booking', { state: { doctorId, slot } });
    };



    const renderPopup = () => {
        if (!selectedDay) return null;


        return (
            <>
                <div className="modal-backdrop show"></div>
                <div className="modal show d-block" tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Available Slots on {selectedDay.date.toDateString()}</h5>
                                <button type="button" className="close" onClick={() => setSelectedDay(null)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {selectedDay.slots.length > 0 ? (
                                    selectedDay.slots.map((slot, index) => (
                                        <div key={index} className="d-flex justify-content-between align-items-center">
                                            <span>{slot.start} - {slot.end}</span>
                                            <button onClick={() => handleBookingClick(doctor.id, `${slot.start} - ${slot.end}`)}>
                                                Book Now
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div>No available slots</div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setSelectedDay(null)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };




    const renderWeekRow = (weekDates: Date[]): JSX.Element[] => {
        return weekDates.map((date, index) => {
            const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });
            const day = date.getDate().toString().padStart(2, '0');
            const month = date.toLocaleString('en-US', { month: 'short' });
            const monthDay = `${month} ${day}`;

            const dayLong = date.toLocaleString('en-US', { weekday: 'long' });
            const bookedSlotsForDay = availability[dayLong.toLowerCase()] || [];
            const availableSlots = getAvailableSlots(bookedSlotsForDay);

            return (
                <div key={index} className="availability-row col">
                    <div
                        className="availability-cell p-1 border rounded text-center"
                        onClick={() => handleCellClick(date, dayLong)}
                    >
                        <div>{dayOfWeek}</div>
                        <div className="text-nowrap">{monthDay}</div>
                        <div>{availableSlots.length}</div>
                        <div>appts</div>
                    </div>
                </div>
            );
        });
    };

    const dates = getNextTwoWeeksDates(startDate);
    const firstWeek = dates.slice(0, 7);
    const secondWeek = dates.slice(7, 14);

    const renderNavigationButtons = () => {
        const isPrevDisabled = new Date(startDate) <= new Date();
        const isNextDisabled = new Date(startDate.getTime() + 14 * 24 * 60 * 60 * 1000).getTime() > new Date().getTime() + maxRangeInDays * 24 * 60 * 60 * 1000;

        return (
            <div className="date-navigation">
                <button onClick={goToPreviousTwoWeeks} disabled={isPrevDisabled}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <span>{startDate.toDateString()}</span>
                <button onClick={goToNextTwoWeeks} disabled={isNextDisabled}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        );
    };


    return (
        <div>
            {renderNavigationButtons()}
            <div className="row g-2 mb-1">{renderWeekRow(firstWeek)}</div>
            <div className="row g-2">{renderWeekRow(secondWeek)}</div>
            {renderPopup()}
        </div>
    );
};

export default AvailabilityGrid;
