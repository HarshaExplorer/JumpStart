import React from 'react'
import {Card, Col, Row, Button, ProgressBar } from 'react-bootstrap'

const ProjectCard = ({project}) => {

  const fundRatio = (project.diff > 0) ? (project.diff) : (100);
  return (
    <>
      <Card border="secondary" style={{ width: '18rem'}}>
         <Card.Img variant="top" src={project.img_url} />
         <Card.Body>
            <Card.Title>{project.title}</Card.Title>
            <ProgressBar now={Math.round(project.diff)}/>
         </Card.Body>
      </Card>
    </>
  )
}

export default ProjectCard