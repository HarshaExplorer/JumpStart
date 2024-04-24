import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Carousel, Card, Image } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import aboutHeader from "../assets/about-page-header-img.jpeg";
import carouselImage1 from "../assets/carousel-img1.jpg";
import carouselImage2 from "../assets/carousel-img2.jpg";
import carouselImage3 from "../assets/carousel-img3.jpg";
import carouselImage4 from "../assets/carousel-img4.jpg";
import carouselImage5 from "../assets/carousel-img5.jpg";
import carouselImage6 from "../assets/carousel-img6.jpg";
import "./About.css";
import database from "../client";

const About = () => {
  const navigate = useNavigate();
  const { pid } = useParams();
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
        const {data, error} = await database
          .from("projects")
          .select("company");
        
        if (error) {
          throw error;
        }
  
        if (data) {
          const uniqueCompanies = new Set(data.map(item => item.company)).size;
          setTotalCompanies(uniqueCompanies);
        }
      };

    getCategories();
    getBackers();
    getProject();
    getFunded();
    getTotalCompanies();
  }, []);

  // Function to format number to display in millions
  const formatToMillions = (number) => {
    return (number / 1000000).toLocaleString(undefined, {
      maximumFractionDigits: 1,
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
        <h1>Why join us?</h1>
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
                  <p
                    className="carousel-title"
                    style={{ fontWeight: "900" }}
                  >
                    {formatToMillions(totalFunded)}M
                  </p>
                  <p className="carousel-subtitle-secondary">
                    Dollars Funded
                  </p>
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
                  <p className="carousel-subtitle-secondary">Projects Created</p>
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
                  <p
                    className="carousel-subtitle-secondary"
                  >
                    User Published Projects
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
                  <p className="carousel-subtitle-secondary">Different Companies</p>
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
        <h1>Let's get started!</h1>
        <p className="mt-3" style={{ fontWeight: "400", fontSize: "25px" }}>Work in progress!</p>
      </Row>
    </Container>
  );
};

export default About;
