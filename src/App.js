import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home"; // Adjust the path as necessary
import Login from "./pages/Login";
import SignupPage from "./pages/Signup";
import Create from "./pages/Create";
import View from "./pages/View";
import Header from "./components/header"; // Ensure Header component path is correct

const App = () => {
  // State to manage the logged-in user's username
  const [username, setUsername] = useState("");

  // Preserve login state on page refresh
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Sync localStorage with username state
  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }
  }, [username]);

  return (
    <Router>
      {/* Global Header Component */}
      <Header username={username} setUsername={setUsername} />
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        {/* Home Page */}
        <Route path="/create" element={<Create username={username} />} />
        <Route path="/home" element={<Home username={username} />} />
        {/* Login Page */}
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        {/* Signup Page */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/view" element={<View username={username} />} />
      </Routes>
    </Router>
  );
};

export default App;
