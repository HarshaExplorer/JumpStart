import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Stack, Image, Form, InputGroup, Button } from "react-bootstrap";
import "../styles/ProjectPage.css";
import Compass from "../assets/compass.png";
import database from "../client";
import { motion } from "framer-motion";

const ProjectPage = ({ token }) => {
  const { pid, user_id, project_life } = useParams();
  const [project, setProject] = useState(false);
  const [backersCount, setBackersCount] = useState(0);
  const [backerFund, setBackerFund] = useState("");
  const [projectEmail, setProjectEmail] = useState("");

  const handleBackerFund = async () => {
    const UserFund = await database
      .from("funds")
      .select()
      .eq("project_id", pid)
      .eq("backer_id", token.user.id);
    console.log(UserFund);

    if (Number(project.amt_pledged) >= Number(project.amt_requested))
      alert(
        "This project's funding goals has been achieved! So, further funds for this project are not accepted."
      );
    else if (token.user.id === project.user_id)
      alert("Cannot fund your own project!");
    else if (UserFund.data.length > 0)
      alert("Cannot pledge to the same project more than once!");
    else if (
      backerFund <= 0 ||
      backerFund > project.amt_requested - project.amt_pledged
    )
      alert(
        "Funds should be minimum $1 and cannot exceed $" +
          (project.amt_requested - project.amt_pledged).toLocaleString() +
          "!"
      );
    else {
      const response = window.confirm(
        "You are willing to fund $" + backerFund.toLocaleString() + "?"
      );
      if (response) {
        let totalFund = Number(project.amt_pledged) + Number(backerFund);
        let error = await database.from("funds").insert({
          backer_id: token.user.id,
          project_id: pid,
          amt: backerFund,
        });
        error = await database
          .from("projects")
          .update({ amt_pledged: totalFund })
          .eq("pid", pid);
        const { data } = await database
          .from("users")
          .select()
          .eq("id", token.user.id);
        error = await database
          .from("users")
          .update({
            total_pledged: Number(data[0].total_pledged) + Number(backerFund),
          })
          .eq("id", token.user.id);

        if (!error.error) {
          alert("Fund Transfer Successful!");
          window.location.reload();
        }
      }
    }

    setBackerFund("");
  };

  useEffect(() => {
    const getProject = async () => {
      const { data, error } = await database
        .from("projects")
        .select()
        .eq("pid", pid);

      if (data) setProject(data[0]);

      const backerData = await database
        .from("funds")
        .select("backer_id", { distinct: "true", count: "exact" })
        .eq("project_id", pid);
      if (backerData && backerData.data) {
        const UniqueBackers = new Set(
          Array.prototype.map.call(backerData.data, (backer) => {
            return `${backer.backer_id}`;
          })
        );

        setBackersCount(UniqueBackers.size);
      }

      const creatorEmail = await database
        .from("users")
        .select()
        .eq("id", user_id);
      if (creatorEmail && creatorEmail.data)
        setProjectEmail(creatorEmail.data[0].email);
    };

    getProject();
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = "#ebe9e6";

    return () => {
      document.body.style.backgroundColor = "#272b33";
    };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {project && (
          <Stack gap={4}>
            <motion.h1
              className="abril-fatface-regular mt-3 mx-auto"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {project.title}
            </motion.h1>
            <hr />
            <Stack direction="horizontal" gap={3}>
              <Image
                className="mx-auto p-2"
                src={project.img_url}
                width="400px"
                height="auto"
                fluid
                rounded
              />

              <Stack direction="vertical" className="mx-auto">
                <motion.h3
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <Image src={Compass} width="25px" height="25px" />{" "}
                  <span className="teko-category p-2">{project.category}</span>
                </motion.h3>
                <motion.h3
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  🏢{" "}
                  <span className="teko-category p-2">{project.company}</span>
                </motion.h3>
                <motion.h3
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  📧 <span className="teko-category p-2">{projectEmail}</span>
                </motion.h3>
                <motion.h3
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  🕒{" "}
                  <span className="teko-category p-2 mb-1">
                    <h2 style={{ display: "inline" }}>
                      {project_life > 0
                        ? `${project_life} day` +
                          (project_life == 1 ? "" : "s") +
                          " to go"
                        : "Project Closed"}
                    </h2>
                  </span>
                </motion.h3>
                <motion.h3
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  🤝{" "}
                  <span className="teko-category p-2">
                    <h2 style={{ display: "inline" }}>
                      {backersCount.toLocaleString()}{" "}
                    </h2>
                    Backer{Number(backersCount) !== 1 ? "s" : ""}
                  </span>
                </motion.h3>
                <motion.h2
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.3 }}
                  className="mt-2 money"
                >
                  {`$${project.amt_pledged.toLocaleString()} Pledged`}{" "}
                  <motion.h4
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.3 }}
                    style={{ display: "inline", color: "black" }}
                  >
                    of {`$${project.amt_requested} goal.`}
                  </motion.h4>
                </motion.h2>
                <motion.p
                  initial={{ y: 50, opacity: 0, scale: 1 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                  className="mt-2"
                >
                  {project.text}
                </motion.p>
                {Number(project_life) > 0 && (
                  <InputGroup className="m-2 mx-auto" style={{ width: "80%" }}>
                    <Button
                      variant="success"
                      className="backer-submit"
                      onClick={handleBackerFund}
                      disabled={
                        token || Number(project_life) <= 0 ? false : true
                      }
                    >
                      Back this project
                    </Button>
                    <Form.Control
                      type="number"
                      className="backer-input-shadow"
                      value={backerFund}
                      onChange={(e) => {
                        setBackerFund(e.target.value);
                      }}
                      placeholder={`Enter dollar amount ($${
                        project.amt_requested - project.amt_pledged
                      } max)`}
                      disabled={token ? false : true}
                      max={project.amt_requested - project.amt_pledged}
                    />
                  </InputGroup>
                )}
                {!token && Number(project_life) > 0 && (
                  <p className="mx-auto" style={{ color: "red" }}>
                    *must be logged in to contribute funds
                  </p>
                )}
              </Stack>
            </Stack>
          </Stack>
        )}
      </motion.div>
    </>
  );
};

export default ProjectPage;
