import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import QueryTool from "../components/QueryTool";
import ProjectCard from "../components/ProjectCard";
import "../styles/menu.css";
import { motion } from "framer-motion";

const Discover = () => {
  document.body.style.backgroundColor = "#272b33";
  const [resultSet, setResultSet] = useState(false);

  return (
    <div className="discover-page" data-bs-theme="dark">
      <QueryTool resultSet={resultSet} setResultSet={setResultSet} />

      <Row md={3} sm={2} lg={4} className="g-4 p-2">
        {resultSet &&
          resultSet.map((p) => {
            return (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1.03 }}
                >
                  <ProjectCard project={p} />
                </motion.div>
                <Col key={p.pid} md></Col>
              </motion.div>
            );
          })}
      </Row>
    </div>
  );
};

export default Discover;
