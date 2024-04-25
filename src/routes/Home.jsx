import React from "react";
import { Typewriter } from "react-simple-typewriter";
import "../styles/Home.css";

const Home = ({ token, setToken }) => {
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
          <span style={{ color: "white" }}>We're</span>{" "}
          <span className="typewriter-style">
            <Typewriter
              words={[
                "more than just a platform.",
                "a launchpad for your dreams.",
                "a bridge that brings your projects to life.",
              ]}
              loop={true}
              cursor
              typeSpeed={40}
            />
          </span>
        </h2>
      </div>
    </div>
  );
};

export default Home;
