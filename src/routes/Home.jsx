import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import {Typewriter} from 'react-simple-typewriter';

const Home = ({ token, setToken }) => {
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
  };

  const fullText =
    "We're more than a platform – we're a launchpad for dreams. Here, innovation finds its voice, and passion fuels progress. JumpStart empowers you to turn potential into reality. Join us in shaping the future.";
  

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-name kanit-bold">
          <span style={{ color: "#6ee397" }}>Jump</span>Start
        </h1>
        <h1 className="landing-title sanchez-regular">
          Empowering Innovators, Fueling Dreams.
        </h1>

        <h2>
          <span style={{color: 'white'}}>We're</span> <span className="typewriter-style"><Typewriter
              words = {['more than a platform.', 'a launchpad for dreams.']}
              loop = {true}
              cursor
              typeSpeed={50}
        />
    </span>
  </h2>
      </div>
    </div>
  );
};

export default Home;
