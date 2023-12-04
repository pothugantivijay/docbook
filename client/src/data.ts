// mockDoctorData.js or mockDoctorData.ts
import { Doctor } from './types/DoctorTypes';

export const mockDoctorData: Doctor[] = [
    {
        id: 1,
        name: "Dr. John Smith",
        specialty: "Cardiology",
        location: "123 Main Street, Cityville",
        email: "john.smith@example.com",
        rating: 4.5,
        profilePicture: "path/to/dr-john-smith.jpg",
        availability: {
            monday: [{ start: "9:00 AM", end: "10:00 AM" }, { start: "11:00 AM", end: "12:00 PM" }],
            tuesday: [{ start: "10:00 AM", end: "11:00 AM" }],
            wednesday: [],
            thursday: [{ start: "9:00 AM", end: "10:00 AM" }],
            friday: [{ start: "1:00 PM", end: "2:00 PM" }, { start: "3:00 PM", end: "4:00 PM" }],
            saturday: [],
            sunday: []
        },
        position: [40.7128, -74.0060]
    },
    {
        id: 2,
        name: "Dr. Emily Taylor",
        specialty: "Dermatology",
        location: "456 Elm Street, Lakeside",
        email: "emily.taylor@example.com",
        rating: 4.8,
        profilePicture: "path/to/dr-emily-taylor.jpg",
        availability: {
            monday: [{ start: "10:00 AM", end: "11:00 AM" }],
            tuesday: [],
            wednesday: [{ start: "10:00 AM", end: "11:00 AM" }, { start: "1:00 PM", end: "2:00 PM" }],
            thursday: [{ start: "2:00 PM", end: "3:00 PM" }],
            friday: [],
            saturday: [{ start: "9:00 AM", end: "10:00 AM" }],
            sunday: [{ start: "11:00 AM", end: "12:00 PM" }]
        },
        position: [34.0522, -118.2437]
    }
    // Add more doctors as needed
];

