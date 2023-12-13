import Test from "../media/test.png";
import { useNavigate } from "react-router-dom";
import { SearchCriteria } from "../types/DoctorTypes";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const navigateToDoctorSearch = (searchCriteria: SearchCriteria) => {
    navigate("/search", { state: { searchCriteria } });
  };

  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h3 className="heading">DocBook</h3>
            <div className="elementstyle">
              <p>
                <a href="./" className="link">
                  Home
                </a>
              </p>
              <p>
                <a href="./help" className="link">
                  Help
                </a>
              </p>
            </div>
          </div>

          <div className="col-md-3">
            <h3 className="heading">Contact</h3>
            <div className="elementstyle">
              <p>
                <a href="#" className="link">
                  service@zocdoc.com
                </a>
              </p>
            </div>
          </div>

          <div className="col-md-3">
            <h3 className="heading">Insurance Carriers</h3>
            <div className="elementstyle">
              <p>
                <a
                  href="https://www.aetna.com"
                  className="link"
                  target="_blank"
                >
                  Aetna
                </a>
              </p>
              <p>
                <a
                  href="https://www.ambetterhealth.com"
                  className="link"
                  target="_blank"
                >
                  Ambetter
                </a>
              </p>
              <p>
                <a href="https://www.bcbs.com" className="link" target="_blank">
                  Blue Cross Blue Shield
                </a>
              </p>
              <p>
                <a
                  href="https://www.cigna.com"
                  className="link"
                  target="_blank"
                >
                  Cigna
                </a>
              </p>
            </div>
          </div>

          <div className="col-md-3">
            <h3 className="heading">Top Specialties</h3>
            <div className="elementstyle">
              <p>
                <a
                  href="javascript:void(0)"
                  className="link"
                  onClick={() =>
                    navigateToDoctorSearch({
                      name: "",
                      specialty: "Primary care",
                      location: "",
                    })
                  }
                >
                  Primary Care Doctor
                </a>
              </p>
              <p>
                <a
                  href="javascript:void(0)"
                  className="link"
                  onClick={() =>
                    navigateToDoctorSearch({
                      name: "",
                      specialty: "Dermatology",
                      location: "",
                    })
                  }
                >
                  Dermatology
                </a>
              </p>
              <p>
                <a
                  href="javascript:void(0)"
                  className="link"
                  onClick={() =>
                    navigateToDoctorSearch({
                      name: "",
                      specialty: "Psychiatry",
                      location: "",
                    })
                  }
                >
                  Psychiatrist
                </a>
              </p>
              <p>
                <a
                  href="javascript:void(0)"
                  className="link"
                  onClick={() =>
                    navigateToDoctorSearch({
                      name: "",
                      specialty: "Nutrition",
                      location: "",
                    })
                  }
                >
                  Nutritionist
                </a>
              </p>
              <p>
                <a
                  href="javascript:void(0)"
                  className="link"
                  onClick={() =>
                    navigateToDoctorSearch({
                      name: "",
                      specialty: "Dental",
                      location: "",
                    })
                  }
                >
                  Dentist
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col">
            <ul className="nav-links li list-inline text-center">
              <li className="list-inline-item">&copy;&nbsp;DocBook, Inc.</li>
              <li className="list-inline-item">
                <a href="#" className="link">
                  Terms
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="link">
                  Privacy
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="link">
                  Site Map
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="link">
                  <img src={Test} className="privacy-image" alt="Privacy" />{" "}
                  Your Privacy Choices
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://twitter.com/zocdoc" target="_blank">
                  <i className="fab fa-twitter twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://www.instagram.com/zocdoc/" target="_blank">
                  <i className="fab fa-instagram insta"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://www.facebook.com/Zocdoc/" target="_blank">
                  <i className="fab fa-facebook fb"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="https://www.linkedin.com/company/zocdoc/"
                  target="_blank"
                >
                  <i className="fab fa-linkedin linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
