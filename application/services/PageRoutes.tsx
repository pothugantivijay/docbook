import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as RouterRoutes,
} from "react-router-dom";
import App from "./App";
import Login from "./Login";
import Help from "./Help";
import DoctorProfile from "./DoctorProfile";
import PatientRegistrationForm from "./PatientRegistration";
import DoctorSearchPage from "./components/DoctorSearchPage";
import BookingPage from "./components/BookingPage";
import FooterPage from "./components/Footer";
import DoctorRegistrationForm from "./components/DoctorRegistration";

const Routes: React.FC = () => {
  return (
    <Router>
      <RouterRoutes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/help" element={<Help />} />
        <Route path="/doctorprofile/doctor/:id" element={<DoctorProfile />} />
        <Route path="/registerpatient" element={<PatientRegistrationForm />} />
        <Route path="/search" element={<DoctorSearchPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/Footer" element={<FooterPage />}/>
        <Route path ="/registerdoctor" element={<DoctorRegistrationForm />}/>
      </RouterRoutes>
    </Router>
  );
};

export default Routes;
