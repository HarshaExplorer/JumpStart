import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Carousel, Card, Image } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import aboutHeader from "../assets/about-page-header-img.jpeg";
import carouselImage1 from "../assets/carousel-img1.jpg";
import carouselImage2 from "../assets/carousel-img2.jpg";
import carouselImage3 from "../assets/carousel-img3.jpg";
import "./About.css";
import database from "../client";

const About = () => {
  const navigate = useNavigate();
  const { pid } = useParams();
  const [project, setProject] = useState(false);
  const [usersCount, setUsersCount] = useState(0);
  const [totalFunded, setTotalFunded] = useState(0);
  const [categories, setCategories] = useState(0);

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

    getCategories();
    getBackers();
    getProject();
    getFunded();
  }, []);

  // Function to format number to display in millions
  const formatToMillions = (number) => {
    return (number / 1000000).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1 style={{ fontWeight: "bolder" }}>What do we do?</h1>
          <p className="mt-3" style={{ fontWeight: "400", fontSize: "25px" }}>
            At JumpStart, our goals have always been to provide a platform which
            can help you bring your projects to life. By implementing smart
            search capabilities and features that help users fund projects,
            anyone can jumpstart their ambitions today.
          </p>
        </Col>
        <Col className="d-flex justify-content-center">
          <div className="image-container">
            <Image src={aboutHeader} fluid />
          </div>
        </Col>
      </Row>

      <Row>
        <h1>Our Impact</h1>
      </Row>

      <Row className="mt-3">
        <Col>
          <Card style={{ borderRadius: "30px", overflow: "hidden" }}>
            {/* adjust image size and colors manually to fix carousel */}
            <Carousel>
              <Carousel.Item>
                <Image
                  src={carouselImage2}
                  className="img-fluid"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <p
                    className="carousel-title-secondary"
                    style={{ fontWeight: "900" }}
                  >
                    {formatToMillions(totalFunded)}
                  </p>
                  <p className="carousel-subtitle-secondary">
                    Million Dollars Funded
                  </p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <Image
                  src={carouselImage1}
                  className="img-fluid"
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <p className="carousel-title">{project}</p>
                  <p className="carousel-subtitle">Projects Created</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Card>
        </Col>

        <Col>
          <Card style={{ borderRadius: "30px", overflow: "hidden" }}>
            {/* adjust image size and colors manually to fix carousel */}
            <Carousel className="carousel-style">
              <Carousel.Item>
                <Image
                  src={carouselImage1}
                  className="img-fluid"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <p className="carousel-title">{usersCount}</p>
                  <p
                    className="carousel-subtitle"
                    style={{ fontWeight: "300" }}
                  >
                    Users published Projects
                  </p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
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
            <Carousel className="carousel-style">
              <Carousel.Item>
                <Image
                  src={carouselImage1}
                  className="img-fluid"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <p className="carousel-subtitle">First slide</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <Image
                  src={carouselImage1}
                  className="img-fluid"
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <p className="carousel-subtitle">Second slide</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <h1>Meet the team</h1>
      </Row>
    </Container>
  );
};

export default About;
