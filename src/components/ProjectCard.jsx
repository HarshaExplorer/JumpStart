import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, ProgressBar } from "react-bootstrap";
import "./menu.css"; // Importing the Discover.css file

const ProjectCard = ({ project, width = "" }) => {
  const navigate = useNavigate();
  const today = new Date();
  const daysLeft =
    Math.round((Date.parse(project.deadline) - today) / (1000 * 60 * 60 * 24)) +
    1;
  const singleDay = daysLeft === 1 ? true : false;

  const redirectProjectPage = () => {
    navigate(`/discover/${project.pid}/${project.user_id}/${daysLeft}`);
  };

  return (
    <>
      <Card
        className="project-card"
        style={{ backgroundColor: "#272b33", color: "#ffffff" }}
      >
        {" "}
        {/* Added bg-secondary for grey color */}{" "}
        <Card.Img
          variant="top"
          className="project-card-img"
          src={project.img_url}
        />
        <Card.Body>
          <Card.Title>{project.title}</Card.Title>
          <Card.Text className="mb-2">{project.company}</Card.Text>
          <Card.Text className="mb-1">
            <span className="kanit-bold">
              {daysLeft > 0
                ? `${daysLeft} day` + (singleDay ? "" : "s") + " left"
                : "Project Closed"}{" "}
              ●{" "}
            </span>
            {`${project.fundRatio}% funded`}
          </Card.Text>
          <ProgressBar
            className="mb-2"
            variant={"success"}
            now={project.fundRatio}
          />
          <Button variant="primary" onClick={redirectProjectPage}>
            View
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProjectCard;
