import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import "../Css/Homepage.css"; // Import the corresponding CSS file for styling
import Footer from "./Footer";
import DocBookHeader from "./DocBookHeader";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import { faHospital } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from "react-i18next";

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
    _id: string;
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
    location: "",
    specialty: "",
    insurance: "",
  });

  //const { t } = useTranslation('common');

  const [users, setUsers] = useState<User[]>([]);
  const minRating = 0; 
  const targetSpecialty = "Cardiologist";

  // Function to fetch data 
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5001/doctor/alldoc');
      const data = await response.json();
      setUsers(data.result); // Update users state with fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  // Function to filter users based on rating
  const filterUsersByRating = () => {
    return users.filter(user => user.rating >= minRating);
  };

  const filteredUsersByRating = filterUsersByRating();

  const filterUsersBySpecialty = () => {
    return users.filter(user => user.specialty === targetSpecialty);
  };
  
  const filteredUsersBySpecialty = filterUsersBySpecialty();

  const getAllSpecialties = () => {
    const specialties = users.map(user => user.specialty);
    const uniqueSpecialties = new Set(specialties);
    return Array.from(uniqueSpecialties);
  };
  
  const allSpecialties = getAllSpecialties();

  const [expanded, setExpanded] = useState<ExpandedState>({
    medical: false,
    dental: false,
    mentalHealth: false,
    vision: false,
  });

    const navigate = useNavigate();
  
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
          Docbook
        </div>
        <div className='uppertext'>Book local doctors who accept your Insurance</div>
        <div className='searchframe'>
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
                name="insurance"
                value={searchParams.insurance}
                onChange={handleSearchChange}
                />
                <button className="btn btn-primary search-btn">
                <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </div>
      </div>
      <div className="doctor-profiles">
        <div className="doctor-row">
          <div className="doctor-row-label">Top Rated Doctors</div>
          <div className="doctor-cards" ref={doctorScrollRef}>
            {filteredUsersByRating.map(user => (
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
        <div className="doctor-row">
          <div className="doctor-row-label">Dentists</div>
          <div className="doctor-cards" ref={dentistScrollRef}>
            {filteredUsersBySpecialty.map(user => (
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
      <div className="doctor-row">
        <div className="doctor-row-label">Top Searched Specialties</div>
        <div className="specialty-cards">
          {topSearchedSpecialties.map((specialty) => (
            <a
              href={specialty.pageUrl}
              key={specialty.id}
              className="specialty-card-link"
            >
              <div className="specialty-card">
                <img
                  src={specialty.logo}
                  alt={specialty.name}
                  className="specialty-logo"
                />
                <div className="specialty-name">{specialty.name}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="doctor-section">
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
      </div>
      <div className="information-section">
        <div className="left-content">
          <h2 className="left-title">Title</h2>
          <p className="left-text">Text describing the content</p>
          <img
            src="path/to/image.jpg"
            alt="Content Image"
            className="left-image"
          />
          <div className="buttons-container">
            <a href="/page1">
              <button className="button1">Button 1</button>
            </a>
            <a href="/page2">
              <button className="button2">Button 2</button>
            </a>
          </div>
        </div>
        <div className="right-content">
          <img
            src="path/to/large-image.jpg"
            alt="Large Image Icon"
            className="large-image"
          />
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
