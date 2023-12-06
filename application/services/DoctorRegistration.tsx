import React, { useState, ChangeEvent, FormEvent, useRef, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";


interface FormData {
  username: string;
  name: string;
  specialty: string;
  address: string;
  latitude: number;
  longitude: number;
  email: string;
  rating: number;
  profilePicture: string;
  availability: {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
  };
  insuranceProviders: string[];
  education: {
    degree: string;
    university: string;
  }[];
  experience: {
    position: string;
    hospital: string;
    duration: string;
  }[];
  about: string;
}

const DoctorRegistrationForm: React.FC = () => {
    const mapRef = useRef<any>(null);
    const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    name: "",
    specialty: "",
    address: "",
    latitude: 0,
    longitude: 0,
    email: "",
    rating: 0,
    profilePicture: "",
    availability: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
    },
    insuranceProviders: [],
    education: [{ degree: "", university: "" }],
    experience: [{ position: "", hospital: "", duration: "" }],
    about: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value, name } = e.target;

    if (id === "latitude" || id === "longitude") {
        // Handle changes for latitude and longitude
        setFormData((prevData) => ({
          ...prevData,
          [id]: parseFloat(value),
        }));
  
    } else if (id === "availability") {
        // handle changes for availability
      const [day, indexStr] = name?.split("-") || [];
      if (day && indexStr !== undefined) {
        const index = parseInt(indexStr, 10);
        setFormData((prevData) => {
          const updatedAvailability = { ...prevData.availability };
          (updatedAvailability[day as keyof typeof updatedAvailability] as string[])[index] = value;
          return {
            ...prevData,
            availability: updatedAvailability,
          };
        });
      }
    } else if (name?.startsWith("degree") || name?.startsWith("university")) {
      // Handle changes for education
      const index = Number(name.match(/\d+/)?.[0] ?? 0);
      setFormData((prevData) => ({
        ...prevData,
        education: prevData.education.map((edu, i) =>
          i === index ? { ...edu, [name]: value } : edu
        ),
      }));
    } else if (name?.startsWith("position") || name?.startsWith("hospital") || name?.startsWith("duration")) {
      // Handle changes for experience
      const index = Number(name.match(/\d+/)?.[0] ?? 0);
      setFormData((prevData) => ({
        ...prevData,
        experience: prevData.experience.map((exp, i) =>
          i === index ? { ...exp, [name]: value } : exp
        ),
      }));
    } else if (name?.startsWith("insuranceProvider")) {
      // Handle changes for insurance providers
      const index = Number(name.match(/\d+/)?.[0] ?? 0);
      setFormData((prevData) => ({
        ...prevData,
        insuranceProviders: prevData.insuranceProviders.map((provider, i) =>
          i === index ? value : provider
        ),
      }));
    } else {
      // Handle other input changes
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };    

  const handleEducationChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      education: prevData.education.map((edu, i) =>
        i === index ? { ...edu, [name]: value } : edu
      ),
    }));
  };

  const handleAddEducation = () => {
    setFormData((prevData) => ({
      ...prevData,
      education: [...prevData.education, { degree: "", university: "" }],
    }));
  };

  const handleRemoveEducation = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      education: prevData.education.filter((edu, i) => i !== index),
    }));
  };

  const handleExperienceChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      experience: prevData.experience.map((exp, i) =>
        i === index ? { ...exp, [name]: value } : exp
      ),
    }));
  };

  const handleAddExperience = () => {
    setFormData((prevData) => ({
      ...prevData,
      experience: [...prevData.experience, { position: "", hospital: "", duration: "" }],
    }));
  };

  const handleRemoveExperience = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      experience: prevData.experience.filter((exp, i) => i !== index),
    }));
  };

  const handleInsuranceProviderChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      insuranceProviders: prevData.insuranceProviders.map((provider, i) =>
        i === index ? value : provider
      ),
    }));
  };
  
  const handleAddInsuranceProvider = () => {
    setFormData((prevData) => ({
      ...prevData,
      insuranceProviders: [...prevData.insuranceProviders, ""],
    }));
  };
  
  const handleRemoveInsuranceProvider = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      insuranceProviders: prevData.insuranceProviders.filter((provider, i) => i !== index),
    }));
  };

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    console.log("Latitude:", lat);
    console.log("Longitude:", lng);
    setCoordinates([lat, lng]);
  };

  const handleMapReady = () => {
    console.log("Map is ready!");
    if (mapRef.current) {
      console.log("Map object:", mapRef.current);
    }
  };

  const MapClickHandler = () => {
    const map = useMapEvents({
      click: handleMapClick,
    });

    useEffect(() => {
      mapRef.current = map;
    }, [map]);

    return null;
  };
   
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("clicked submit");
    try {
      const response = await fetch("/doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Doctor registered successfully!");
        window.location.href = "/help";
      } else {
        console.error("Error registering doctor.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="containerfluid mt-5 mb-5 ">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div
            className="card p-4"
            style={{
              borderRadius: "15px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2 className="text-center mb-4" style={{ color: "#007BFF" }}>
              Doctor Registration
            </h2>

            {/* Registration Details */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <h4 style={{ color: "#495057" }}>Registration Details</h4>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="specialty" className="form-label">
                    Specialty
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="specialty"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Contact and Location */}
              <div className="mb-4">
                <h4 style={{ color: "#495057" }}>Contact and Location</h4>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
            <label htmlFor="map" className="form-label">
              Map
            </label>
                <MapContainer
                  center={[37.7749, -122.4194]}
                  zoom={13}
                  style={{ height: "400px", width: "100%" }}
                  whenReady={handleMapReady}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <MapClickHandler />
                  {coordinates && <Marker position={coordinates} />}
                </MapContainer>
          </div>

          <div className="mb-3">
            <label htmlFor="latitude" className="form-label">
              Latitude
            </label>
            <input
              type="text"
              className="form-control"
              id="latitude"
              value={coordinates ? coordinates[0] : ""}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label htmlFor="longitude" className="form-label">
              Longitude
            </label>
            <input
              type="text"
              className="form-control"
              id="longitude"
              value={coordinates ? coordinates[1] : ""}
              readOnly
            />
          </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="rating" className="form-label">
                    Rating
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="rating"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="profilePicture" className="form-label">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="profilePicture"
                    name="photo"
                    accept="image/*"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Availability */}
            <div className="mb-4">
                <h4 style={{ color: "#495057" }}>Availability</h4>
                <label htmlFor="availability" className="form-label">
                    Availability
                </label>
                <input
                type="text"
                className="form-control"
                id="availability"
                onChange={handleInputChange}
                />
            </div>

              {/* Insurance Providers */}
                <div className="mb-4">
                  <h4 style={{ color: "#495057" }}>Insurance Providers</h4>
                  {formData.insuranceProviders.map((provider, index) => (
                    <div key={index} className="mb-3">
                      <label htmlFor={`insuranceProvider${index}`} className="form-label">
                        Insurance Provider
                      </label>
                      <input
                        type="text"
                        id={`insuranceProvider${index}`}
                        name={`insuranceProvider${index}`}
                        value={provider}
                        className="form-control"
                        onChange={(e) => handleInsuranceProviderChange(e, index)}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleAddInsuranceProvider}
                  >
                    Add Insurance Provider
                  </button>
                  {formData.insuranceProviders.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger ms-2"
                      //className="form-control"
                      onClick={() => handleRemoveInsuranceProvider(formData.insuranceProviders.length - 1)}
                    >
                      Remove Last Insurance Provider
                    </button>
                  )}
                </div>

              {/* Education */}
              <div className="mb-4">
                <h4 style={{ color: "#495057" }}>Education</h4>
                {formData.education.map((edu, index) => (
                  <div key={index} className="mb-3">
                    <label htmlFor={`degree${index}`} className="form-label">
                      Degree
                    </label>
                    <input
                      type="text"
                      id={`degree${index}`}
                      name={`degree${index}`}
                      value={edu.degree}
                      className="form-control"
                      onChange={(e) => handleEducationChange(e, index)}
                    />
                    <label htmlFor={`university${index}`} className="form-label">
                      University
                    </label>
                    <input
                      type="text"
                      id={`university${index}`}
                      name={`university${index}`}
                      value={edu.university}
                      className="form-control"
                      onChange={(e) => handleEducationChange(e, index)}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleAddEducation}
                >
                  Add Education
                </button>
                {formData.education.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger ms-2"
                    //className="form-control"
                    onClick={() => handleRemoveEducation(formData.education.length - 1)}
                  >
                    Remove Last Education
                  </button>
                )}
              </div>

               {/* Experience */}
            <div className="mb-4">
              <h4 style={{ color: "#495057" }}>Experience</h4>
              {formData.experience.map((exp, index) => (
                <div key={index} className="mb-3">
                  <label htmlFor={`position${index}`} className="form-label">
                    Position
                  </label>
                  <input
                    type="text"
                    id={`position${index}`}
                    name={`position${index}`}
                    value={exp.position}
                    className="form-control"
                    onChange={(e) => handleExperienceChange(e, index)}
                  />
                  <label htmlFor={`hospital${index}`} className="form-label">
                    Hospital
                  </label>
                  <input
                    type="text"
                    id={`hospital${index}`}
                    name={`hospital${index}`}
                    value={exp.hospital}
                    className="form-control"
                    onChange={(e) => handleExperienceChange(e, index)}
                  />
                  <label htmlFor={`duration${index}`} className="form-label">
                    Duration
                  </label>
                  <input
                    type="text"
                    id={`duration${index}`}
                    name={`duration${index}`}
                    value={exp.duration}
                    className="form-control"
                    onChange={(e) => handleExperienceChange(e, index)}
                  />
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleAddExperience}
              >
                Add Experience
              </button>
              {formData.experience.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger ms-2"
                  //className="form-control"
                  onClick={() => handleRemoveExperience(formData.experience.length - 1)}
                >
                  Remove Last Experience
                </button>
              )}
            </div>

              {/* About */}
              <div className="mb-4">
                <h4 style={{ color: "#495057" }}>About</h4>
                <div className="mb-3">
                  <label htmlFor="about" className="form-label">
                    About
                  </label>
                  <textarea
                    className="form-control"
                    id="about"
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 mt-3"
                style={{ backgroundColor: "#007BFF", borderColor: "#007BFF" }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegistrationForm;
