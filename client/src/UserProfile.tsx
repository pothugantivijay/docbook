import React, { useState, useEffect } from "react";
import Patient from "./interfaces/Patient";
import ImageAndText from "./components/ImageAndText";
import HelloImg from "./media/3568984.jpg";
import PatientDetails from "./components/PatientUserProfile";
import PatientAppointments from "./components/PatientUserAppointments";

function Profile() {
  const [patientData, setPatientData] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch("/patient");

        if (!response.ok) {
          throw new Error("Failed to fetch patient data");
        }

        const data = await response.json();
        setPatientData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching patient data");
      }
    };

    fetchPatientData();
  }, []);

  return (
    // <div>
    //   <div className="header">
    //     <div className="DocBook">DocBook</div>
    //     <div className="navigation">
    //       <a href="#">Browse</a>
    //       <a href="/help">Help</a>
    //     </div>
    //   </div>
    //   <ImageAndText
    //     imagePath={HelloImg}
    //     text={`Hi, ${patientData?.name}`}
    //   ></ImageAndText>
    //   {patientData && <PatientDetails patient={patientData}></PatientDetails>}
    // </div>
    <>
      <PatientDetails patient={patientData}></PatientDetails>
      <PatientAppointments></PatientAppointments>
    </>
  );
}

export default Profile;
