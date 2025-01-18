import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore"; // Firestore functions
import { db } from "../firebase"; // Firestore instance
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Login handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch all documents from the "Accounts" collection
      const accountsRef = collection(db, "Accounts");
      const querySnapshot = await getDocs(accountsRef);

      // Find the user in the collection
      const user = querySnapshot.docs
        .map((doc) => doc.data())
        .find((account) => account.Email === formData.email);

      if (!user) {
        setErrorMessage("Email not found.");
        return;
      }

      if (user.Password !== formData.password) {
        setErrorMessage("Password incorrect. Please enter your keyword.");
        setShowKeywordPrompt(true);
        return;
      }

      // Successful login
      setSuccessMessage("Login successful!");
      setErrorMessage("");
      setUsername(user.Fullname);
      setFormData({ email: "", password: "", keyword: "" });

      navigate("/home");
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Error connecting to the database.");
    }
  };

  // Forgot password handler
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch all documents from the "Accounts" collection
      const accountsRef = collection(db, "Accounts");
      const querySnapshot = await getDocs(accountsRef);

      // Find the user in the collection
      const user = querySnapshot.docs
        .map((doc) => doc.data())
        .find((account) => account.Email === formData.email);

      if (!user) {
        setErrorMessage("Account not found.");
        return;
      }

      if (user.Keyword.trim() !== formData.keyword.trim()) {
        setErrorMessage("Keyword incorrect.");
        return;
      }

      // Show recovered account details
      setSuccessMessage(
        `Account Details: Full Name: ${user.Fullname}, Password: ${user.Password}`
      );
      setErrorMessage("");
      setForgotPassword(false);
    } catch (error) {
      console.error("Error recovering account:", error);
      setErrorMessage("Error connecting to the database.");
    }
  };

  // Toggle forgot password form
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
