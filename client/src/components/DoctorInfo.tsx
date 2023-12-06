import React from 'react';
import '../Css/DoctorInfo.css'; // Ensure this file contains your custom styling
import { Doctor } from '../types/DoctorTypes';
import AvailabilityGrid from './availabilityGrid';

interface DoctorInfoProps {
    doctor: Doctor;
}

const DoctorInfo: React.FC<DoctorInfoProps> = ({ doctor }) => {
    return (
        <div className="card mb-3 doctor-card">
            <div className="row g-0">
                <div className="col-md-4">
                    <img
                        src={doctor.profilePicture || "path/to/default/image.jpg"}
                        className="img-fluid rounded-start doctor-image"
                        alt={doctor.name}
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{doctor.name}</h5>
                        <p className="card-text">{doctor.specialty}</p>
                        <p className="card-text"><small className="text-muted">{doctor.address}</small></p>
                        <AvailabilityGrid doctor={doctor} availabilitySummary={doctor.availabilitySummary} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorInfo;
