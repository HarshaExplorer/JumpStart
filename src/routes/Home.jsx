import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = ({ token, setToken }) => {
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
  };

  const typeRef = useRef(null);

  useEffect(() => {
    const text = typeRef.current.textContent.trim();
    typeRef.current.textContent = ""; // Clear existing content

    let i = 0;
    const speed = 15;

    const typeWriter = () => {
      if (i < text.length) {
        typeRef.current.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    };

    typeWriter();
  }, []);

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-name">JumpStart.</h1>
        <h1 className="landing-title">
          JumpStart: Empowering Innovators, Fueling Dreams.
        </h1>
        <h2 ref={typeRef} className="landing-h2">
          {}
          At JumpStart, we're more than a platform – we're a launchpad for
          dreams. Here, innovation finds its voice, and passion fuels progress.
          JumpStart empowers you to turn potential into reality. Join us in
          shaping the future.
        </h2>
      </div>
    </div>
  );
};

export default Home;
