import React, { useState } from "react";
import "../styles/Signup.css";
import axios from "axios";
import SignupImage from "../assets/SIM2.png";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const Signup = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    keyword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/signup",
        formData
      );

      setSuccessMessage(response.data); // Display success message from server
      setErrorMessage("");
      setFormData({ fullName: "", email: "", password: "", keyword: "" }); // Reset the form

      // Redirect to login page after success
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirect after 2 seconds to show success message
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data : "Error connecting to the server."
      );
      setSuccessMessage("");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <img
          src={SignupImage}
          alt="Signup Illustration"
          className="signup-image"
        />
      </div>
      <div className="signup-right">
        <h1 className="project-title">HELIXURE</h1>
        <h1 className="signup-title">Create Your Account</h1>
        <p className="signup-subtitle">
          Fill in the details below to create your account
        </p>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <label htmlFor="keyword">Keyword</label>
          <input
            type="text"
            id="keyword"
            name="keyword"
            value={formData.keyword}
            onChange={handleChange}
            placeholder="Enter a keyword"
            required
          />

          <button type="submit" className="signup-button">
            SIGN UP
          </button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="Login-link">
          <p>
            Already have an account,{" "}
            <Link to="/Login" className="create-account-link">
              Login
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
