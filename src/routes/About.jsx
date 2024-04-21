import React from 'react'
import {Carousel, Card, Button, Image} from 'react-bootstrap'
import {Container, Row, Col} from 'react-bootstrap'
import aboutHeader from '../assets/images/about-page-header-img.jpeg'
import './About.css'

const About = () => {
  return (
    <Container>
      <Row className='mt-5'>
        <Col>
        <h1>About</h1>
        <p>At JumpStart, </p>
        </Col>
        <Col className='d-flex justify-content-center'>
          <div className='image-container'>
            <Image src={aboutHeader} fluid />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default About;