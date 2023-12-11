import React, { useState } from "react";
import SearchForm from "./SearchForm";
import DoctorProfile from "./DoctorProfile";
import DoctorMap from "./DoctorMap";
import { searchDoctors } from "../api";
import "../Css/DoctorInfo.css";
import { SearchCriteria, Doctor } from "../types/DoctorTypes";
import DocBookHeader from "./DocBookHeader";

const DoctorSearchPage: React.FC = () => {
  const [doctorProfiles, setDoctorProfiles] = useState<Doctor[]>([]);

  const handleSearchSubmit = (searchCriteria: SearchCriteria) => {
    searchDoctors(searchCriteria)
      .then((data) => setDoctorProfiles(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="container-fluid customContainerFluid">
      <div className="row">
        <div className="col-7" id="search-container">
          <DocBookHeader></DocBookHeader>
          <SearchForm onSearchSubmit={handleSearchSubmit} />
          <div id="search-results">
            <DoctorProfile doctors={doctorProfiles} />
          </div>
        </div>
        <div className="col-5 p-1" id="map">
          <DoctorMap doctors={doctorProfiles} />
        </div>
      </div>
    </div>
  );
};

export default DoctorSearchPage;
