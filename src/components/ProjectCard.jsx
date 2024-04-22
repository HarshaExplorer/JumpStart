import React from 'react'
import {Card, Col, Row, Button, ProgressBar } from 'react-bootstrap'
import './menu.css'

const ProjectCard = ({project, width=''}) => {
 
  const fundRatio = (project.diff > 0) ? (Math.trunc((project.amt_pledged*100/project.amt_requested))) : (100);
  
  const today = new Date();
  const daysLeft = Math.round((Date.parse(project.deadline) - today) / (1000*60*60*24)) + 1;
  const singleDay = (daysLeft===1)?(true):(false);
  console.log('width: ' + width)
  return (
    <>
      <Card  style={{ width: width, backgroundColor: 'inherit', borderColor: '#78f0ba'}}>
         <Card.Img variant="top" style={{ height: "18rem"}} src={project.img_url} />
         <Card.Body>
            <Card.Title>{project.title}</Card.Title>
            <Card.Text className='mb-2'>{project.company}</Card.Text>
            <Card.Text className='mb-1'><span className='kanit-bold'>
                {(daysLeft > 0 ? (`${daysLeft} day`+ (singleDay?(''):('s')) + ' left' ):('Project Closed'))} ● </span>
                {`${fundRatio}% funded`}
            </Card.Text>
            <ProgressBar className='mb-2' variant={'success'} now={fundRatio} />
            <Button variant="primary">View</Button>
         </Card.Body>
      </Card>
    </>
  )
}

export default ProjectCard