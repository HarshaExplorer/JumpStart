import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import useTypewriter from "./useTypeWriter.js";

const Home = ({ token, setToken }) => {
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
  };

  const fullText =
    "At JumpStart, we're more than a platform – we're a launchpad for dreams. Here, innovation finds its voice, and passion fuels progress. JumpStart empowers you to turn potential into reality. Join us in shaping the future.";
  const displayText = useTypewriter(fullText);

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-name kanit-bold">
          <span style={{ color: "#6ee397" }}>Jump</span>Start.
        </h1>
        <h1 className="landing-title sanchez-regular">
          JumpStart: Empowering Innovators, Fueling Dreams.
        </h1>
        <h2 className="landing-h2 sanchez-regular">{displayText}</h2>
      </div>
    </div>
  );
};

export default Home;
