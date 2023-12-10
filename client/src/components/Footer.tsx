// Footer.jsx
import React from 'react';
import AppStore from "../media/appstore.png";
import GoolgeStore from "../media/googleplay.png";
import Twitter from "../media/twitter.png";
import Insta from "../media/insta.png";
import FaceBook from "../media/fb.png";
import LinkedIn from "../media/linkedin.png";
import Test from "../media/test.png";
import "../Css/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container">
        <div className="nav-container">
          <nav className="section0">
            <h2 className="heading">DocBook</h2>
            <div className="elementstyle">
              <p><a href="./">Home</a></p>
              <p><a href="#">About us</a></p>
              <p><a href="#">Press</a></p>
              <p><a href="#">Careers</a></p>
              <p><a href="./help">Help</a></p>
            </div>
          </nav>

          <nav className="section1">
            <h2 className="heading">Contact</h2>
            <div className="elementstyle">
              <p><a href="#">service@zocdoc.com</a></p>
              <p>855-962-3621</p>
            </div>
          </nav>

          <nav className="section2">
            <h2 className="heading">Discover</h2>
            <div className="elementstyle">
              <p><a href="#">The Paper Gown <br /><br /><br /><br /><br />
              Stories for and about patients</a></p>
              <p><a href="#">Community Standards</a></p>
              <p><a href="#">Data and privacy</a></p>
              <p><a href="#">Verified reviews</a></p>
            </div>
          </nav>

          <nav className="section3">
            <h2 className="heading">Insurance Carriers</h2>
            <div className="elementstyle">
              <p><a href="#">Aetna</a></p>
              <p><a href="#">Ambetter</a></p>
              <p><a href="#">Anthem Blue Cross Blue Shield</a></p>
              <p><a href="#">Blue Cross Blue Shield</a></p>
              <p><a href="#">Cigna</a></p>
            </div>
          </nav>

          <nav className="section4">
            <h2 className="heading">Top Specialties</h2>
            <div className="elementstyle">
              <p><a href="#">Primary Care Doctor</a></p>
              <p><a href="#">Urgent Care</a></p>
              <p><a href="#">Dermatologist</a></p>
              <p><a href="#">Psychiatrist</a></p>
              <p><a href="#">Ear, Nose & Throat Doctor</a></p>
              <p><a href="#">Pediatrist</a></p>
              <p><a href="#">Urologist</a></p>
            </div>
          </nav>

          {/* <nav className="section5">
            <h2 className="heading">Are you a top doctor or health service?</h2>
            <p><a href="#">List your practice on DocBook</a></p>
            <p><a href="#">Access DocBook for Developers</a></p>
          </nav> */}

          {/* <nav className="section6">
            <h2 className="heading">Marketing for your practice</h2>
            <p><a href="#">Dental Marketing</a></p>
            <p><a href="#">Dermatology Marketing</a></p>
            <p><a href="#">Primary Care Marketing</a></p>
          </nav> */}

          <nav className="section7">
            <b>Get the DocBook app</b>
            <br />
            <a href="https://apps.apple.com/us/app/zocdoc/id391062219" target="_blank">
              <img src={AppStore} className="app" alt="App Store" />
            </a> <br/>
            <a href="https://play.google.com/store/apps/details?id=com.zocdoc.android" target="_blank">
              <img src={GoolgeStore} className="app" alt="Google Play" />
            </a>
          </nav>
        </div>

        <nav className="footer">
          <ul className="nav-links li">
            <li>&copy;&nbsp;DocBook, Inc.</li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">site map</a></li>
            <li>
              <a href="#">
                <img src={Test} className="privacy-image" alt="Privacy" />Your privacy choices
              </a>
            </li>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <li><a href="https://twitter.com/zocdoc" target="_blank"><img src={Twitter} className="twitter" alt="Twitter" /></a></li>
            <li><a href="https://www.instagram.com/zocdoc/" target="_blank"><img src={Insta} className="insta" alt="Instagram" /></a></li>
            <li><a href="https://www.facebook.com/Zocdoc/" target="_blank"><img src={FaceBook} className="fb" alt="Facebook" /></a></li>
            <li><a href="https://www.linkedin.com/company/zocdoc/" target="_blank"><img src={LinkedIn} className="linkedin" alt="LinkedIn" /></a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
