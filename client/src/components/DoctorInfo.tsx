import React from 'react';
import '../Css/DoctorInfo.css'; // Ensure this file contains your custom styling
import { Doctor } from '../types/DoctorTypes';
import AvailabilityGrid from './availabilityGrid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope, faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons'; // Filled star
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'; // Half-filled star
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons'; // Empty star
import defdoc from '../media/defaultdoc.png';




interface DoctorInfoProps {
    doctor: Doctor;
}

const DoctorInfo: React.FC<DoctorInfoProps> = ({ doctor }) => {

    function renderStars(rating: number) {
        const roundedRating = Math.round(rating * 2) / 2; // Round to nearest half
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            if (i <= roundedRating) {
                stars.push(<FontAwesomeIcon icon={fasFaStar} className="filled-star" />);
            } else if (i === Math.ceil(roundedRating) && roundedRating % 1 !== 0) {
                stars.push(<FontAwesomeIcon icon={faStarHalfAlt} className="half-filled-star" />);
            } else {
                stars.push(<FontAwesomeIcon icon={farFaStar} className="empty-star" />);
            }
        }

        return stars;
    }

    return (
        <div className="card mb-3 doctor-card-search">
            <div className="row g-0">
                {/* Profile Picture */}
                <div className="col-md-2 doctor-details">
                    <img
                        src={defdoc}
                        className="img-fluid rounded-start doctor-image"
                        alt={doctor.name}
                    />
                </div>

                {/* Doctor Details */}
                <div className="col-md-3">
                    <div className="doctor-details">
                        <div>
                            <h5 className="card-title">
                                {doctor.name}
                            </h5>
                            <p className="card-text doctor-rating">
                                {renderStars(doctor.rating)}<small><strong>&nbsp;{doctor.rating}</strong></small>
                            </p>
                            <p className="card-text">
                                <FontAwesomeIcon icon={faStethoscope} /> <small className="text-muted">{doctor.specialty}</small>
                            </p>

                            <p className="card-text">
                                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#ff6347' }} /> <small className="text-muted">{doctor.address}</small>
                            </p>
                            <p className="card-text">
                                <FontAwesomeIcon icon={faEnvelope} /> <small className="text-muted">{doctor.email}</small>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Availability Grid */}
                <div className="col-md-7">
                    <div className="card-body">
                        <h6 className="availability-heading">Check Availability</h6>
                        <AvailabilityGrid doctor={doctor} availabilitySummary={doctor.availabilitySummary} />
                    </div>
                </div>
            </div>
        </div>


    );
};

export default DoctorInfo;
