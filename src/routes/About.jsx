import React, { useState, useEffect } from "react";
import { Carousel, Card, Image } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import aboutHeader from "../assets/about-page-header-img.jpeg";
import carouselImage1 from "../assets/carousel-img1.jpg";
import carouselImage2 from "../assets/carousel-img2.jpg";
import carouselImage3 from "../assets/carousel-img3.jpg";
import carouselImage4 from "../assets/carousel-img4.jpg";
import carouselImage5 from "../assets/carousel-img5.jpg";
import carouselImage6 from "../assets/carousel-img6.jpg";
import database from "../client";
import "../styles/About.css";

const About = () => {
  const [project, setProject] = useState(false);
  const [usersCount, setUsersCount] = useState(0);
  const [totalFunded, setTotalFunded] = useState(0);
  const [categories, setCategories] = useState(0);
  const [totalCompanies, setTotalCompanies] = useState(0);

  useEffect(() => {
    const getProject = async () => {
      const numProjects = await database
        .from("projects")
        .select("pid", { distinct: "true", count: "exact", head: true });

      if (numProjects && numProjects.count) {
        setProject(numProjects.count);
      }
    };

    const getFunded = async () => {
      try {
        const { data, error } = await database
          .from("projects")
          .select("amt_pledged");

        if (error) {
          throw error;
        }

        const sum = data.reduce(
          (acc, project) => acc + parseFloat(project.amt_pledged),
          0
        );
        setTotalFunded(sum);
      } catch (error) {
        console.error("Error fetching total funded amount:", error.message);
      }
    };

    const getBackers = async () => {
      try {
        const { data, error } = await database
          .from("projects")
          .select("user_id");

        if (error) {
          throw error;
        }

        // Extract all user_id values
        const userIDs = data.map((project) => project.user_id);

        // Calculate the count of unique user_id values
        const uniqueBackers = new Set(userIDs).size;
        setUsersCount(uniqueBackers);
      } catch (error) {
        console.error("Error fetching total number of backers:", error.message);
      }
    };

    const getCategories = async () => {
      try {
        const { data, error } = await database
          .from("projects")
          .select("category");

        if (error) {
          throw error;
        }

        const categoriesCount = data.map((project) => project.category);
        const uniqueCategories = new Set(categoriesCount).size;
        setCategories(uniqueCategories);
      } catch (error) {
        console.error(
          "Error fetching total number of categories:",
          error.message
        );
      }
    };

    const getTotalCompanies = async () => {
      const { data, error } = await database.from("projects").select("company");

      if (error) {
        throw error;
      }

      if (data) {
        const uniqueCompanies = new Set(data.map((item) => item.company)).size;
        setTotalCompanies(uniqueCompanies);
      }
    };

    getCategories();
    getBackers();
    getProject();
    getFunded();
    getTotalCompanies();
    document.body.style.backgroundColor = "#272B33";
  }, []);

  // Function to format number to display in millions
  const formatToMillions = (number) => {
    return (number / 1000000).toLocaleString(undefined, {
      maximumFractionDigits: 1,
    });
  };

  return (
    <Container style={{ paddingBottom: "40px" }}>
      <Row className="mt-5">
        <Col>
          <motion.h1
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            style={{ color: "white", fontWeight: "bolder" }}
          >
            What do we do?
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-3"
            style={{ color: "white", fontWeight: "400", fontSize: "25px" }}
          >
            At JumpStart, our goals have always been to provide a platform which
            can help you bring your projects to life. By implementing smart
            search capabilities and features that help users fund projects,
            anyone can jumpstart their ambitions today.
          </motion.p>
        </Col>
        <Col className="d-flex justify-content-center">
          <Card
            style={{ width: "25rem", borderRadius: "30px", overflow: "hidden" }}
          >
            <Image src={aboutHeader} fluid />
          </Card>
        </Col>
      </Row>

      <Row>
        <motion.h1
          initial={{ y: 110, opacity: 0, scale: 1 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{ color: "white" }}
        >
          Why join us?
        </motion.h1>
      </Row>

      <Row className="mt-3">
        <Col>
          <Card style={{ borderRadius: "30px", overflow: "hidden" }}>
            {/* adjust image size and colors manually to fix carousel */}
            <Carousel fade>
              <Carousel.Item interval={5000}>
                <Image
                  src={carouselImage2}
                  className="img-fluid"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <p className="carousel-title" style={{ fontWeight: "900" }}>
                    {formatToMillions(totalFunded)}M
                  </p>
                  <p className="carousel-subtitle-secondary">Dollars Funded</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item interval={5000}>
                <Image
                  src={carouselImage1}
                  className="img-fluid"
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <p className="carousel-title">{project}</p>
                  <p className="carousel-subtitle-secondary">
                    Projects Created
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Card>
        </Col>

        <Col>
          <Card style={{ borderRadius: "30px", overflow: "hidden" }}>
            {/* adjust image size and colors manually to fix carousel */}
            <Carousel className="carousel-style" fade>
              <Carousel.Item interval={5000}>
                <Image
                  src={carouselImage6}
                  className="img-fluid"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <p className="carousel-title">{usersCount}</p>
                  <p className="carousel-subtitle-secondary">
                    Users Published Projects
                  </p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item interval={5000}>
                <Image
                  src={carouselImage3}
                  className="img-fluid"
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <p className="carousel-title">{categories}</p>
                  <p className="carousel-subtitle-secondary">
                    Different Market Segments
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Card>
        </Col>

        <Col>
          <Card style={{ borderRadius: "30px", overflow: "hidden" }}>
            {/* adjust image size and colors manually to fix carousel */}
            <Carousel className="carousel-style" fade>
              <Carousel.Item interval={5000}>
                <Image
                  src={carouselImage5}
                  className="img-fluid"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <p className="carousel-title">{totalCompanies}</p>
                  <p className="carousel-subtitle-secondary">
                    Different Companies
                  </p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item interval={5000}>
                <Image
                  src={carouselImage4}
                  className="img-fluid"
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <p className="carousel-title-small">It's Free!</p>
                  <p className="carousel-subtitle-secondary">No Hidden Fees</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <h1 style={{ color: "white" }}>Let's get started!</h1>
        <Card
          className="mt-3"
          style={{
            borderRadius: "30px",
            overflow: "hidden",
          }}
        >
          <Row>
            <Col>
              <p
                className="mt-3"
                style={{
                  fontWeight: "400",
                  fontSize: "25px",
                }}
              >
                Create an account
              </p>
            </Col>
            <Col>
              <p className="mt-3" style={{ fontSize: "150%" }}>
                Go to{" "}
                <bold>
                  <span style={{ color: "darkgreen", fontWeight: "800" }}>
                    Sign Up
                  </span>
                </bold>{" "}
                to create an account and log in. This is required to fund and
                create projects.
              </p>
            </Col>
          </Row>
        </Card>

        <Card
          className="mt-3"
          style={{ borderRadius: "30px", overflow: "hidden" }}
        >
          <Row>
            <Col>
              <p
                className="mt-3"
                style={{ fontWeight: "400", fontSize: "25px" }}
              >
                How to fund projects?
              </p>
            </Col>
            <Col>
              <p className="mt-3" style={{ fontSize: "150%" }}>
                Go to{" "}
                <bold>
                  <span style={{ color: "darkgreen", fontWeight: "800" }}>
                    Discover
                  </span>
                </bold>{" "}
                to browse through all user projects. Click a project that
                interests you and enter the amount to fund.
              </p>
            </Col>
          </Row>
        </Card>
        <Card
          className="mt-3"
          style={{ borderRadius: "30px", overflow: "hidden" }}
        >
          <Row>
            <Col>
              <p
                className="mt-3"
                style={{ fontWeight: "400", fontSize: "25px" }}
              >
                How to create a project?
              </p>
            </Col>
            <Col>
              <p
                className="mt-3"
                style={{ fontWeight: "300", fontSize: "150%" }}
              >
                Go to{" "}
                <bold>
                  <span style={{ color: "darkgreen", fontWeight: "800" }}>
                    Start Project
                  </span>
                </bold>{" "}
                and fill in the form with your project details. Once done, click
                'JumpStart your project'!
              </p>
            </Col>
          </Row>
        </Card>
        <Card
          className="mt-3"
          style={{ borderRadius: "30px", overflow: "hidden" }}
        >
          <Row>
            <Col>
              <p
                className="mt-3"
                style={{ fontWeight: "400", fontSize: "25px" }}
              >
                How to edit your project?
              </p>
            </Col>
            <Col>
              <p
                className="mt-3"
                style={{ fontWeight: "300", fontSize: "150%" }}
              >
                Go to{" "}
                <bold>
                  <span style={{ color: "darkgreen", fontWeight: "800" }}>
                    Manage
                  </span>
                </bold>{" "}
                to browse through your projects and click 'Edit' on the one you
                want to make changes.
              </p>
            </Col>
          </Row>
        </Card>
        <Card
          className="mt-3"
          style={{ borderRadius: "30px", overflow: "hidden" }}
        >
          <Row>
            <Col>
              <p
                className="mt-3"
                style={{ fontWeight: "400", fontSize: "25px" }}
              >
                How to track funds for your project?
              </p>
            </Col>
            <Col>
              <p
                className="mt-3"
                style={{ fontWeight: "300", fontSize: "150%" }}
              >
                Go to{" "}
                <bold>
                  <span style={{ color: "darkgreen", fontWeight: "800" }}>
                    Manage
                  </span>
                </bold>{" "}
                to browse through all user projects and click 'Track Funds'.
              </p>
            </Col>
          </Row>
        </Card>
      </Row>
    </Container>
  );
};

export default About;
