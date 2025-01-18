import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import HomeIcon from "../assets/HL.png";

const Header = ({ username, setUsername }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username"); // Clear stored username
    setUsername(null); // Clear username state
    navigate("/login"); // Navigate to login page
  };

  return (
    <header className="header">
      <div className="header-left">
        <span>Welcome {username || "Guest"}</span>
      </div>

      <nav className="header-nav">
        {!username && (
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Login
          </NavLink>
        )}
        {username && (
          <NavLink
            to="/create"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Create
          </NavLink>
        )}
        {username && (
          <NavLink
            to="/view"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            View
          </NavLink>
        )}
      </nav>

      <div className="header-right">
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <button className="icon-button" aria-label="Home">
            <img src={HomeIcon} alt="Home Icon" className="profile-icon" />
          </button>
        </NavLink>
        {username && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
