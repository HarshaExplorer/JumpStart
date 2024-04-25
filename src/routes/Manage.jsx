import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QueryTool from "../components/QueryTool";
import ProjectCard from "../components/ProjectCard";
import { Col, Row } from "react-bootstrap";
import "../styles/Manage.css";
import { motion } from "framer-motion";

const Manage = ({ token = false }) => {
  document.body.style.backgroundColor = "#272b33";
  const [resultSet, setResultSet] = useState(false);
  let manage = false;

  const navigate = useNavigate();

  if (token) {
    manage = {
      header: "Here you can track & refine your projects.",
      headerMarginTop: "",
      user: token.user.id,
    };
  } else if (!token) {
    setTimeout(() => {
      navigate("/authenticate");
    }, 50);
  }

  useEffect(() => {
    document.body.style.backgroundColor = "#272b33";
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {token && (
          <div data-bs-theme="dark" className="manage-container">
            <h3 className="kanit-bold text-center" style={{ color: "white" }}>
              Welcome
              {token.user.identities[0].identity_data.fullname
                ? ", " + token.user.identities[0].identity_data.fullname
                : ""}
              !
            </h3>

            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              <QueryTool
                resultSet={resultSet}
                setResultSet={setResultSet}
                manage={manage}
              />
            </motion.div>
            <Row md={4} sm={2} className="g-4 p-2">
              {resultSet &&
                resultSet.map((p) => {
                  return (
                    <motion.Col
                      key={p.pid}
                      md
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 1.03 }}
                      >
                        <ProjectCard project={p} manage={true} />
                      </motion.div>
                    </motion.Col>
                  );
                })}
            </Row>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Manage;
