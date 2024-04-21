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
    const speed = 20;

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
        <h1 className="landing-title">Your Journey Starts here.</h1>
        <h2 ref={typeRef} className="landing-h2">
          {/* Add your text content here */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </h2>
        <Link to="/" className="logout-btn" onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Home;
