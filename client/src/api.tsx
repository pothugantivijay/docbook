import { mockDoctorData } from './data';
import { Doctor, SearchCriteria } from './types/DoctorTypes'

export const searchDoctors = (searchCriteria: SearchCriteria): Promise<Doctor[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const filteredData = mockDoctorData.filter((doctor: Doctor) =>
                doctor.name.toLowerCase().includes(searchCriteria.name.toLowerCase()) &&
                doctor.specialty.toLowerCase().includes(searchCriteria.specialty.toLowerCase()) &&
                doctor.location.toLowerCase().includes(searchCriteria.location.toLowerCase())
            );
            resolve(filteredData);
        }, 1000);
    });
};
