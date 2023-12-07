interface Appointment {
    doctorId: number;
    doctorName: String;
    doctorSpecialty: String;
    username: string;
    name: string;
    email: string;
    condition: string;
    startTime: Date;
    endTime: Date;
    date: Date;
    insuranceProvider: string;
    insuranceNumber: string;
}

export default Appointment;