import React from "react";
import { Typewriter } from "react-simple-typewriter";
import "../styles/Home.css";
import { motion } from "framer-motion";
import videoBg from '../assets/video-background.mp4'

const Home = ({ token, setToken }) => {
  return (
    
    <div className="landing-container">
      <video className="background-video" src={videoBg} autoPlay loop muted />
      <div className="landing-content">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 100 }}
          transition={{ delay: 0.2 }}
          className="landing-name kanit-bold"
        >
          <span style={{ color: "#6ee397" }}>Jump</span>Start
        </motion.h1>
        <motion.h1
          style={{ paddingBottom: "100px" }}
          className="landing-title sanchez-regular"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 100 }}
          transition={{ delay: 0.2 }}
        >
          Empowering Innovators, Fueling Dreams.
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span style={{ color: "white" }}>We're</span>{" "}
          <span className="typewriter-style">
            <Typewriter
              words={[
                "more than just a platform.",
                "a launchpad for your dreams.",
                "the bridge that brings your projects to life.",
              ]}
              loop={true}
              cursor
              typeSpeed={40}
              DelaySpeed={2}
            />
          </span>
        </motion.h2>
      </div>
    </div>
  );
};

export default Home;
