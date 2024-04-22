import React from 'react'
import {Carousel, Card, Button, Image} from 'react-bootstrap'
import {Container, Row, Col} from 'react-bootstrap'
import aboutHeader from '../assets/images/about-page-header-img.jpeg'
import carouselImage1 from '../assets/images/carousel-img1.jpeg'
import './About.css'

const About = () => {
  return (
    <Container>
      <Row className='mt-5'>
        <Col>
        <h1>About</h1>
        <p className='mt-5'>At JumpStart, our goals have always been to provide a platform which can help you bring your projects to life.
          By implementing smart search capabilites and features that help users fund projects, anyone can jumpstart their ambitions today.
        </p>
        </Col>
        <Col className='d-flex justify-content-center'>
          <div className='image-container'>
            <Image src={aboutHeader} fluid />
          </div>
        </Col>
      </Row>
      
      <Row className='mt-5'>
        <h1>Our Impact</h1>
      </Row>
      
      
      <Row className='mt-3'>
        <Col>
          <Card>
            {/* adjust image size and colors manually to fix carousel */}
            <Carousel>

              <Carousel.Item>
                <Image src={carouselImage1} alt="First slide" />
                <Carousel.Caption style={{color: 'black'}}>
                  <h3>Funding</h3>
                  <p>First slide</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <Image src={carouselImage1} alt="Second slide" />
                <Carousel.Caption style={{color: 'black'}}>
                  <h3>Projects</h3>
                  <p>Second slide</p>
                </Carousel.Caption>
              </Carousel.Item>


            </Carousel>
          </Card>     
        </Col>

        <Col>
          <Card>
            {/* adjust image size and colors manually to fix carousel */}
            <Carousel>

              <Carousel.Item>
                <Image src={carouselImage1} alt="First slide" />
                <Carousel.Caption style={{color: 'black'}}>
                  <h3>Funding</h3>
                  <p>First slide</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <Image src={carouselImage1} alt="Second slide" />
                <Carousel.Caption style={{color: 'black'}}>
                  <h3>Projects</h3>
                  <p>Second slide</p>
                </Carousel.Caption>
              </Carousel.Item>


            </Carousel>
          </Card>
        </Col>

        <Col>
        </Col>
      </Row>

    </Container>
  )
}

export default About;