import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import "../Css/Homepage.css"; // Import the corresponding CSS file for styling
import Footer from "./Footer";
import DocBookHeader from "./DocBookHeader";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { faHospital } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { SearchCriteria } from "../types/DoctorTypes";
import rightimg from "../media/right-img.png";
import qrimg from "../media/qr-img.png";
import AppStore from "../media/appstore.png";
import GoolgeStore from "../media/googleplay.png";
import Cardiologist from "../media/Cardiologist.jpg";
import Dentist from "../media/Dentist.jpg";
import OBGYN from "../media/OB-GYN.jpg";
import PrimaryCare from "../media/Primary Care.jpg";
import Psychiatrist from "../media/Psychiatrist.jpg";

type ExpandedState = {
  medical: boolean;
  dental: boolean;
  mentalHealth: boolean;
  vision: boolean;
};

interface User {
  location: {
    latitude: number;
    longitude: number;
  };
  id: number;
  username: string;
  name: string;
  specialty: string;
  address: string;
  email: string;
  rating: number;
  profilePicture: string;
  availability: {
    _id: string;
    slots: any[];
  }[];
  insuranceProviders: any[];
  education: {
    degree: string;
    university: string;
    _id: string;
  }[];
  experience: {
    position: string;
    hospital: string;
    duration: string;
    _id: string;
  }[];
  about: string;
  __v: number;
}

const HomePage = () => {
  const [searchParams, setSearchParams] = useState({
    name: "",
    specialty: "",
    location: "",
  });

  //const { t } = useTranslation('common');

  const [users, setUsers] = useState<User[]>([]);
  const minRating = 0;
  const targetSpecialty = "Cardiologist";

  const navigateToDoctorSearch = (searchCriteria: SearchCriteria) => {
    navigate("/search", { state: { searchCriteria } });
  };

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5001/doctor/alldoc");
      const data = await response.json();
      setUsers(data.result); // Update users state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  // Function to filter users based on rating
  const filterUsersByRating = () => {
    return users.filter((user) => user.rating >= minRating);
  };

  const filteredUsersByRating = filterUsersByRating();

  const filterUsersBySpecialty = () => {
    return users.filter((user) => user.specialty === targetSpecialty);
  };

  const filteredUsersBySpecialty = filterUsersBySpecialty();

  const allSpecialties = [
    "Primary Care",
    "Dentist",
    "Dermatologist",
    "Psychiatrist",
    "Opthalmologist",
  ];
  const navigate = useNavigate();

  const handleCardClick = (doctorId: number) => {
    navigate(`/doctorprofile/doctor/${doctorId}`);
  };

  const [expanded, setExpanded] = useState<ExpandedState>({
    medical: false,
    dental: false,
    mentalHealth: false,
    vision: false,
  });

  const handleRedirect = (path: string) => {
    navigate(path);
  };

  const toggleExpand = (reason: keyof ExpandedState) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [reason]: !prevExpanded[reason],
    }));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const topRatedDoctors = [
    { id: 1, name: "Dr. John Doe", specialty: "Cardiologist" },
    { id: 2, name: "Dr. Jane Smith", specialty: "Dermatologist" },
    { id: 3, name: "Dr. John Doe", specialty: "Cardiologist" },
    { id: 4, name: "Dr. Jane Smith", specialty: "Dermatologist" },
    { id: 5, name: "Dr. John Doe", specialty: "Cardiologist" },
    { id: 6, name: "Dr. Jane Smith", specialty: "Dermatologist" },
    { id: 7, name: "Dr. John Doe", specialty: "Cardiologist" },
    { id: 8, name: "Dr. Jane Smith", specialty: "Dermatologist" },
    { id: 9, name: "Dr. John Doe", specialty: "Cardiologist" },
    { id: 10, name: "Dr. Jane Smith", specialty: "Dermatologist" },
    { id: 11, name: "Dr. John Doe", specialty: "Cardiologist" },
    { id: 12, name: "Dr. Jane Smith", specialty: "Dermatologist" },
    // Add more top-rated doctor profiles here
  ];

  const dentists = [
    { id: 3, name: "Dr. Alex Johnson", specialty: "Dentist" },
    { id: 4, name: "Dr. Emily Brown", specialty: "Orthodontist" },
    // Add more dentist profiles here
  ];

  const doctorScrollRef = useRef<HTMLDivElement | null>(null);
  const dentistScrollRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = (ref: React.RefObject<HTMLDivElement> | null) => {
    if (ref && ref.current) {
      ref.current.scrollTo({
        left: ref.current.scrollLeft - 200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = (ref: React.RefObject<HTMLDivElement> | null) => {
    if (ref && ref.current) {
      ref.current.scrollTo({
        left: ref.current.scrollLeft + 200,
        behavior: "smooth",
      });
    }
  };

  const topSearchedSpecialties = [
    {
      id: 1,
      name: "Orthodontics",
      logo: "path/to/orthodontics-logo.png",
      pageUrl: "/orthodontics-page",
    },
    {
      id: 2,
      name: "Pediatric Dentistry",
      logo: "path/to/pediatric-dentistry-logo.png",
      pageUrl: "/orthodontics-page",
    },
    {
      id: 1,
      name: "Orthodontics",
      logo: "path/to/orthodontics-logo.png",
      pageUrl: "/orthodontics-page",
    },
    {
      id: 2,
      name: "Pediatric Dentistry",
      logo: "path/to/pediatric-dentistry-logo.png",
      pageUrl: "/orthodontics-page",
    },

    // Add more specialties
  ];

  const doctorCards = [
    {
      id: 1,
      doctorName: "Doctor 1",
      doctorLogo: "path/to/doctor1-logo.png",
      doctorDescription: "Description for Doctor 1",
      buttonLabel: "View Profile",
      // Add more properties as needed for other cards
    },
    {
      id: 2,
      doctorName: "Doctor 2",
      doctorLogo: "path/to/doctor2-logo.png",
      doctorDescription: "Description for Doctor 2",
      buttonLabel: "View Profile",
      // Add more properties as needed for other cards
    },
    {
      id: 3,
      doctorName: "Doctor 3",
      doctorLogo: "path/to/doctor3-logo.png",
      doctorDescription: "Description for Doctor 3",
      buttonLabel: "View Profile",
      // Add more properties as needed for other cards
    },
    // Add more doctor cards
  ];

  return (
    <div className="homepage">
      <div className="upper">
        <DocBookHeader></DocBookHeader>
        <div className="uppertext">
          Book local doctors who accept your Insurance
        </div>
        <div className="searchframe">
          <div className="search-bar">
            <div className="search-icon">
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <input
              type="text"
              className="mb-2"
              placeholder="Location"
              name="location"
              value={searchParams.location}
              onChange={handleSearchChange}
            />
            <div className="search-icon">
              <FontAwesomeIcon icon={faHospital} />
            </div>
            <input
              type="text"
              className="mb-2"
              placeholder="Specialty"
              name="specialty"
              value={searchParams.specialty}
              onChange={handleSearchChange}
            />
            <div className="search-icon">
              <FontAwesomeIcon icon={faUserDoctor} />
            </div>
            <input
              type="text"
              className="mb-2"
              placeholder="Name"
              name="name"
              value={searchParams.name}
              onChange={handleSearchChange}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                navigateToDoctorSearch(searchParams);
              }}
              className="btn btn-primary search-btn"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>
      <div className="doctor-profiles">
        <div className="docrow-display">
          <div className="doctor-row-label">
            Top Rated Doctors
            <h3> 90% patients rated 5-stars</h3>
          </div>
          <div className="doctor-row">
            <div className="doctor-cards" ref={doctorScrollRef}>
              {filteredUsersByRating.map((user) => (
                <div
                  className="doctor-card"
                  key={user.id}
                  onClick={() => handleCardClick(user.id)}
                >
                  <h3>Dr. {user.name}</h3>
                  <p>{user.specialty}</p>
                </div>
              ))}
              {filteredUsersByRating.map((user) => (
                <div className="doctor-card" key={user.id}>
                  <h3>Dr. {user.name}</h3>
                  <p>{user.specialty}</p>
                </div>
              ))}
            </div>
            <div className="scroll-arrows">
              <button
                onClick={() => scrollLeft(doctorScrollRef)}
                className="scroll-left"
              >
                &lt;
              </button>
              <button
                onClick={() => scrollRight(doctorScrollRef)}
                className="scroll-right"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
        <div className="docrow-display">
          <div className="doctor-row-label">{targetSpecialty}</div>
          <div className="doctor-row">
            <div className="doctor-cards" ref={dentistScrollRef}>
              {filteredUsersBySpecialty.map((user) => (
                <div className="doctor-card" key={user.id}>
                  <h3>Dr. {user.name}</h3>
                  <p>{user.specialty}</p>
                </div>
              ))}
              {dentists.map((dentist) => (
                <div className="doctor-card">
                  <h3>{dentist.name}</h3>
                  <p>{dentist.specialty}</p>
                  {/* Add more dentist details */}
                </div>
              ))}
            </div>
            <div className="scroll-arrows">
              <button
                onClick={() => scrollLeft(dentistScrollRef)}
                className="scroll-left"
              >
                &lt;
              </button>
              <button
                onClick={() => scrollRight(dentistScrollRef)}
                className="scroll-right"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="doctor-spec">
        <div className="doctor-row-label">Top Searched Specialties</div>
        <div className="specialty-cards">
          <a
            href="/search"
            onClick={(e) => {
              e.preventDefault();
              navigateToDoctorSearch({
                name: "",
                specialty: "Primary Care",
                location: "",
              });
            }}
            className="specialty-card-link"
          >
            <div className="specialty-card">
              <img src={PrimaryCare}></img>
              <div className="specialty-name">Primary Care</div>
            </div>
          </a>

          <a
            href="/search"
            onClick={(e) => {
              e.preventDefault();
              navigateToDoctorSearch({
                name: "",
                specialty: "Dentist",
                location: "",
              });
            }}
            className="specialty-card-link"
          >
            <div className="specialty-card">
              <img src={Dentist}></img>
              <div className="specialty-name">Dentist</div>
            </div>
          </a>

          <a
            href="/search"
            onClick={(e) => {
              e.preventDefault();
              navigateToDoctorSearch({
                name: "",
                specialty: "OB-GYN",
                location: "",
              });
            }}
            className="specialty-card-link"
          >
            <div className="specialty-card">
              <img src={OBGYN}></img>
              <div className="specialty-name">OB-GYN</div>
            </div>
          </a>

          <a
            href="/search"
            onClick={(e) => {
              e.preventDefault();
              navigateToDoctorSearch({
                name: "",
                specialty: "Psychiatrist",
                location: "",
              });
            }}
            className="specialty-card-link"
          >
            <div className="specialty-card">
              <img src={Psychiatrist}></img>
              <div className="specialty-name">Psychiatrist</div>
            </div>
          </a>

          <a
            href="/search"
            onClick={(e) => {
              e.preventDefault();
              navigateToDoctorSearch({
                name: "",
                specialty: "Cardiologist",
                location: "",
              });
            }}
            className="specialty-card-link"
          >
            <div className="specialty-card">
              <img src={Cardiologist}></img>
              <div className="specialty-name">Cardiologist</div>
            </div>
          </a>
        </div>
      </div>
      {/* <div className="doctor-section">
            <h2 className="doctor-section-title">Doctors</h2>
            <div className="doctor-cards-container">
            {doctorCards.map((doctor) => (
                <div className="doctor-card" key={doctor.id}>
                <img
                    src={doctor.doctorLogo}
                    alt={doctor.doctorName}
                    className="doctor-logo"
                />
                <div className="doctor-info">
                    <h3 className="doctor-name">{doctor.doctorName}</h3>
                    <p className="doctor-description">{doctor.doctorDescription}</p>
                    <button className="doctor-btn">{doctor.buttonLabel}</button>
                </div>
                </div>
            ))}
            </div>
        </div> */}
      <div className="information-section">
        <div className="left-content">
          <h2 className="left-title">Thousands of providers.</h2>
          <h2>One app.</h2>
          <p className="left-text">
            The DocBook app is the quickest, easiest way to book and keep track
            of your appointments.
          </p>
          <img src={qrimg} alt="Content Image" className="left-image" />
          <div className="buttons-container">
            <a
              href="https://apps.apple.com/us/app/zocdoc/id391062219"
              target="_blank"
            >
              <img src={AppStore} className="app" alt="App Store" />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.zocdoc.android"
              target="_blank"
            >
              <img src={GoolgeStore} className="app" alt="Google Play" />
            </a>
          </div>
        </div>
        <div className="right-content">
          <img src={rightimg} alt="Large Image Icon" className="large-image" />
        </div>
      </div>
      <div className="visit-reasons-section">
        <h2 className="visit-reasons-title">Common Visit Reasons</h2>
        <div className="visit-reasons">
          <div className="visit-reason medical">
            <div
              className="reason-title"
              onClick={() => toggleExpand("medical")}
            >
              Medical
              <span className={`arrow ${expanded.medical ? "expanded" : ""}`}>
                &#9658;
              </span>
            </div>
            {expanded.medical && (
              <div className="sub-reasons">
                <a href="/medical/physical">Physical</a>
                <br />
                <a href="/medical/physicians">Physicians</a>
                <br />
                <a href="/medical/covid-testing">COVID Testing</a>
              </div>
            )}
          </div>
          <div className="visit-reason medical">
            <div
              className="reason-title"
              onClick={() => toggleExpand("dental")}
            >
              Dental
              <span className={`arrow ${expanded.dental ? "expanded" : ""}`}>
                &#9658;
              </span>
            </div>
            {expanded.dental && (
              <div className="sub-reasons">
                <a href="/medical/physical">Physical</a>
                <br />
                <a href="/medical/physicians">Physicians</a>
                <br />
                <a href="/medical/covid-testing">COVID Testing</a>
              </div>
            )}
          </div>
          <div className="visit-reason medical">
            <div
              className="reason-title"
              onClick={() => toggleExpand("mentalHealth")}
            >
              Medical
              <span
                className={`arrow ${expanded.mentalHealth ? "expanded" : ""}`}
              >
                &#9658;
              </span>
            </div>
            {expanded.mentalHealth && (
              <div className="sub-reasons">
                <a href="/medical/physical">Physical</a>
                <br />
                <a href="/medical/physicians">Physicians</a>
                <br />
                <a href="/medical/covid-testing">COVID Testing</a>
              </div>
            )}
          </div>
          <div className="visit-reason medical">
            <div
              className="reason-title"
              onClick={() => toggleExpand("vision")}
            >
              Medical
              <span className={`arrow ${expanded.vision ? "expanded" : ""}`}>
                &#9658;
              </span>
            </div>
            {expanded.vision && (
              <div className="sub-reasons">
                <a href="/medical/physical">Physical</a>
                <br />
                <a href="/medical/physicians">Physicians</a>
                <br />
                <a href="/medical/covid-testing">COVID Testing</a>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
