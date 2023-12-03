import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DoctorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Access the id parameter from the URL
  const [doctorDetails, setDoctorDetails] = useState<any>(null);

  useEffect(() => {
    // Fetch doctor details when the component mounts
    fetch(`/doctorprofile/doctor/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setDoctorDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching doctor details:", error);
      });
  }, [id]); // Include id as a dependency to re-fetch when the id changes

  if (!doctorDetails) {
    return <p>Loading...</p>;
  }

  // Render the doctor details in your component
  return (
    <div>
      <h1>{doctorDetails.name}</h1>
      {/* Render other details as needed */}
    </div>
  );
};

export default DoctorProfile;
