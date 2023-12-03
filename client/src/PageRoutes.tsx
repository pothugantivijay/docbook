import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as RouterRoutes,
} from "react-router-dom";
import App from "./App";
import Login from "./Login";
import Help from "./Help";

const Routes: React.FC = () => {
  return (
    <Router>
      <RouterRoutes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/help" element={<Help />} />
      </RouterRoutes>
    </Router>
  );
};

export default Routes;
