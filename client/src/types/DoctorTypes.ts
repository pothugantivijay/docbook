// DoctorTypes.ts
export interface BookedSlot {
    start: string;
    end: string;
}

export interface DoctorAvailability {
    [key: string]: BookedSlot[];
}


export interface Doctor {
    id: number;
    name: string;
    specialty: string;
    location: string;
    email: string;
    rating: number;
    profilePicture: string;
    availability: DoctorAvailability;
    position: [number, number];
}

export interface SearchCriteria {
    name: string;
    specialty: string;
    location: string;
}