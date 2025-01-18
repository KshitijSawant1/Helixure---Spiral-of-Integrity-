import React, { useState } from "react";
import "../styles/Signup.css";
import { db } from "../firebase"; // Import Firestore
import { collection, addDoc } from "firebase/firestore"; // Firestore functions
import SignupImage from "../assets/SIM2.png";
import { Link, useNavigate } from "react-router-dom"; // For navigation

const Signup = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    keyword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Update form data when input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle signup form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add user data to Firestore Accounts collection
      const accountsRef = collection(db, "Accounts");
      await addDoc(accountsRef, {
        Fullname: formData.fullName,
        Email: formData.email,
        Password: formData.password,
        Keyword: formData.keyword,
      });

      // Show success message and reset form
      setSuccessMessage(
        "Account created successfully! Redirecting to Login..."
      );
      setErrorMessage("");
      setFormData({ fullName: "", email: "", password: "", keyword: "" });

      // Redirect to login page
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error signing up:", error);
      setErrorMessage("Error creating account. Please try again.");
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
