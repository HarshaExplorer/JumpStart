import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = ({ token, setToken }) => {
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Your Crowdfunding Platform</h1>
        {/* Add your styled text here */}
        <Link to="/" className="logout-btn" onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Landing;
