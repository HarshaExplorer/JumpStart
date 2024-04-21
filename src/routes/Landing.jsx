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
        <h2 className="landing-h2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </h2>
        <Link to="/" className="logout-btn" onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Landing;
