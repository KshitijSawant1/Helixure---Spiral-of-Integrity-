import React from "react";
import "../styles/Home.css"; // Ensure `Home.css` exists in the styles folder
import arrowButton from "../assets/RA.png"; // Ensure `RA.png` exists in the assets folder
import profilePic from "../assets/Profile.png";
import Downarrowbutton from "../assets/DA.png";
import { useNavigate } from "react-router-dom";
const Home = ({ username }) => {
  const navigate = useNavigate(); // Hook for navigation

  // Handle click for the explore button
  const handleExploreClick = () => {
    if (username) {
      navigate("/create"); // Navigate to the create page if logged in
    } else {
      navigate("/login"); // Navigate to the login page if not logged in
    }
  };

  return (
    <div className="home">
      {/* Main Section */}
      <main className="home-main">
        {/* Title and Tagline */}
        <h1 className="PT">HELIXURE</h1>
        <p className="PTtagline">
          {username ? `Welcome back, ${username}!` : "The Spiral of Integrity"}
        </p>

        {/* Explore Button */}
        <div className="explore-button" onClick={handleExploreClick}>
          <img src={arrowButton} alt="Explore Button" />
        </div>

        {/* Scroll Icon */}
        <button
          className="scroll-icon"
          onClick={() =>
            document
              .getElementById("credits-section")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          <img src={Downarrowbutton} alt="Scroll Down Arrow" />
        </button>
      </main>

      {/* Footer Section */}
      <footer className="home-footer" id="credits-section">
        <h2>Visionary Behind the Project</h2>
        <div className="card-container">
          {/* Card 1: Profile Info */}
          <div className="card">
            <img src={profilePic} alt="Profile" className="card-img" />
            <h3>Kshitij Sawant (KS)</h3>
            <p className="title">Senior Developer</p>
            <p>Artificial Intelligence and Blockchain Enthusiast</p>
          </div>

          {/* Card 2: Role and Responsibilities */}
          <div className="card">
            <h3>Role and Responsibilities:</h3>
            <p className="description">
              Developing and maintaining the core blockchain functionality and
              user interface for Helixure.
              <ul>
                <li>Implementing distributed ledger mechanisms.</li>
                <li>Designing scalable React.js frontends.</li>
                <li>Using Firestore for data integrity and security.</li>
              </ul>
            </p>
          </div>

          {/* Card 3: Contact Information */}
          <div className="card">
            <h3>Contact Information:</h3>
            <div className="contact-info">
              <ul>
                <li>
                  <a
                    href="https://www.linkedin.com/in/kshitijksawant/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/KshitijSawant1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="mailto:sawantkshitij1@gmail.com">Email Me</a>
                </li>
                <li>Location: Mumbai, India</li>
              </ul>
            </div>
          </div>

          {/* Card 4: Testimonials */}
          <div className="card">
            <h3>Testimonials:</h3>
            <p className="testimonials">
              "An innovative developer with a vision for secure and efficient
              systems."
            </p>
            <p className="testimonials">
              "Consistently delivers high-quality, scalable solutions under
              tight deadlines."
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
