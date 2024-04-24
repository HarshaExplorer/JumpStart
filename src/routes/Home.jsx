import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Home.css";

// const Home = () => {
//   useEffect(() => {
//     document.body.style.backgroundColor = "#272b33";
//   }, []);

const Home = ({ token, setToken }) => {
  document.body.style.backgroundColor = "#272b33";
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-name kanit-bold">
          <span style={{ color: "#6ee397" }}>Jump</span>Start.
        </h1>
        <h1 className="landing-title sanchez-regular">
          JumpStart: Empowering Innovators, Fueling Dreams.
        </h1>
        <motion.h2
          className="landing-h2 sanchez-regular"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          At JumpStart, we're more than a platform – we're a launchpad for
          dreams. Here, innovation finds its voice, and passion fuels progress.
          JumpStart empowers you to turn potential into reality. Join us in
          shaping the future.
        </motion.h2>
      </div>
    </div>
  );
};

export default Home;
