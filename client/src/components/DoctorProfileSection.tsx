import "../Css/doctorProfile.css";
import "../Css/card.css";
import DoctorCard from "./DoctorCard";

import DoctorInterface from "../interfaces/Doctor";

interface DoctorDetailsProps {
  doctor: DoctorInterface;
}

const DoctorProfileSection: React.FC<DoctorDetailsProps> = ({ doctor }) => {
  const isProfileLinkVisible = window.localStorage.getItem("Type") !== null;
  return (
    <div className="profileSection">
      <div className="header">
        <div className="DocBook">DocBook</div>
        <div className="navigation">
          <a href="#">Browse</a>
          <a href="/help">Help</a>
          {isProfileLinkVisible ? (
            <a href="/profile">Profile</a>
          ) : (
            <a href="/login">Log in / Sign up</a>
          )}
        </div>
      </div>
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <DoctorCard doctor={doctor}></DoctorCard>
          </div>
          <div className="highlights">
            <div className="highlightItem">
              <img
                src={require("../media/icons8-celebration-48.png")}
                width={64}
                height={64}
              />
              <div className="recommendationText">
                <p>
                  <b>Highly Recommended</b>
                </p>
                <p>100% Patients Recommend this doctor</p>
              </div>
            </div>
          </div>
          <div className="highlights">
            <div className="highlightItem">
              <img src={require("../media/icons8-time-64.png")} />
              <div className="recommendationText">
                <p>
                  <b>Excellent wait time</b>
                </p>
                <p>95% of patients waited less than 30 minutes</p>
              </div>
            </div>
          </div>
          <div className="highlights">
            <div className="highlightItem">
              <img
                width="64"
                height="64"
                src="https://img.icons8.com/3d-fluency/94/today.png"
                alt="today"
              />
              <div className="recommendationText">
                <p>
                  <b>New patient appointments</b>
                </p>
                <p>Appointments available for new patients</p>
              </div>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileSection;
