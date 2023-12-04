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
<<<<<<< HEAD
import PatientRegistrationForm from "./PatientRegistration";
=======
>>>>>>> main

const Routes: React.FC = () => {
  return (
    <Router>
      <RouterRoutes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/help" element={<Help />} />
        <Route path="/doctorprofile/doctor/:id" element={<DoctorProfile />} />
<<<<<<< HEAD
        <Route path="/registerpatient" element={<PatientRegistrationForm />} />
=======
>>>>>>> main
      </RouterRoutes>
    </Router>
  );
};

export default Routes;
