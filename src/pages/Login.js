import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const Login = ({ setUsername }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    keyword: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showKeywordPrompt, setShowKeywordPrompt] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle password visibility
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formData
      );

      const { message, username } = response.data;

      setSuccessMessage(message);
      setErrorMessage("");
      setUsername(username);
      setFormData({ email: "", password: "", keyword: "" });

      navigate("/home");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data);

        if (
          error.response.data ===
          "Password incorrect. Please enter your keyword."
        ) {
          setShowKeywordPrompt(true);
          setErrorMessage("");
        }
      } else {
        setErrorMessage("Error connecting to the server.");
      }
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/recover", {
        email: formData.email,
        keyword: formData.keyword,
      });

      const { username, password } = response.data; // Extract username and password

      // Set a string message for successMessage
      setSuccessMessage(
        `Account Details: Full Name: ${username}, Password: ${password}`
      );
      setErrorMessage("");
      setForgotPassword(false); // Hide the forgot password form
    } catch (error) {
      setErrorMessage(
        error.response?.data || "Error connecting to the server."
      );
      setSuccessMessage("");
    }
  };

  const toggleForgotPassword = () => {
    setForgotPassword((prevState) => !prevState);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img
          src={require("../assets/SIM1.png")}
          alt="Login Illustration"
          className="login-image"
        />
      </div>
      <div className="login-right">
        <h1 className="project-title">HELIXURE</h1>
        <h1 className="login-title">Login to your Account</h1>
        <form className="login-form" onSubmit={handleSubmit}>
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
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>

        <button
          className="forgot-password-button"
          onClick={toggleForgotPassword}
        >
          Forgot Password?
        </button>

        {forgotPassword && (
          <form
            className="forgot-password-form"
            onSubmit={handleForgotPasswordSubmit}
          >
            <h2>Forgot Password</h2>
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

            <label htmlFor="keyword">Keyword</label>
            <input
              type="text"
              id="keyword"
              name="keyword"
              value={formData.keyword}
              onChange={handleChange}
              placeholder="Enter your keyword"
              required
            />
            <button type="submit" className="login-button">
              Recover Account
            </button>
          </form>
        )}

        {successMessage && (
          <div className="account-details">{successMessage}</div>
        )}

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="signup-link">
          <p>
            If you are new here,{" "}
            <Link to="/signup" className="create-account-link">
              Create an Account
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
