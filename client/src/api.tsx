import { AppointmentData, Doctor, SearchCriteria, Slot } from './types/DoctorTypes'

export const searchDoctors = (searchCriteria: SearchCriteria): Promise<Doctor[]> => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:5001/doctor/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchCriteria)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => resolve(data as Doctor[]))
            .catch(error => reject(error));
    });
};

export const fetchSlotDetails = (doctorId: string, date: Date): Promise<Slot[]> => {
    return new Promise((resolve, reject) => {
        const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

        fetch(`http://localhost:5001/doctor/slot/${doctorId}/slots?date=${formattedDate}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => resolve(data as Slot[]))
            .catch(error => reject(error));
    });
}

export const fetchDoctorDetails = async (doctorId: Number) => {
    try {
        const response = await fetch(`http://localhost:5001/doctor/${doctorId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching doctor details:", error);
    }
};

export const createAppointment = async (appointmentData: AppointmentData) => {
    try {
        const response = await fetch('http://localhost:5001/appts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointmentData),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to create appointment:', error);
        throw error;
    }
};

