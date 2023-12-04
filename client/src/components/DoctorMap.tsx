import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import Leaflet
import { Doctor } from '../types/DoctorTypes'; // Import the Doctor type
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import ReactDOMServer from 'react-dom/server';


interface DoctorMapProps {
    doctors: Doctor[];
}
interface MapBoundsSetterProps {
    doctors: Doctor[];
}

const doctorIcon = new L.Icon({
    iconUrl: `data:image/svg+xml,${encodeURIComponent(
        ReactDOMServer.renderToStaticMarkup(
            <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" color="red" />
        )
    )}`,
    iconSize: [30, 30], // Size of the icon
    iconAnchor: [15, 30], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -30], // Point from which the popup should open relative to the iconAnchor
});

const MapBoundsSetter: React.FC<MapBoundsSetterProps> = ({ doctors }) => {
    const map = useMap();

    useEffect(() => {
        if (doctors.length > 0) {
            const bounds = L.latLngBounds(doctors.map((doctor: Doctor) => doctor.position));
            map.fitBounds(bounds);
        }
    }, [doctors, map]);

    return null;
};


const DoctorMap: React.FC<DoctorMapProps> = ({ doctors }) => {
    const [userPosition, setUserPosition] = useState<[number, number]>([51.505, -0.09]); // Default position

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserPosition([position.coords.latitude, position.coords.longitude]);
            },
            () => {
                console.error("Error getting user's location");
            }
        );
    }, []);

    return (
        <MapContainer center={userPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {doctors.map((doctor) => (
                <Marker key={doctor.id} position={doctor.position} icon={doctorIcon}>
                    <Popup>
                        <div>
                            <h3>{doctor.name}</h3>
                            <p>{doctor.specialty}</p>
                            <p>{doctor.location}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
            <MapBoundsSetter doctors={doctors} />
        </MapContainer>
    );
};

export default DoctorMap;
