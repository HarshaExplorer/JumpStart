import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Card, ButtonGroup, Button, ProgressBar } from 'react-bootstrap'
import './menu.css'

const ProjectCard = ({project, manage=false}) => {
  
  const navigate = useNavigate();  
  const today = new Date();
  const daysLeft = Math.round((Date.parse(project.deadline) - today) / (1000*60*60*24)) + 1;
  const singleDay = (daysLeft===1)?(true):(false);
  
  const redirectProjectPage = (e) => {
      if (e.target.name === 'view')
          navigate(`/discover/${project.pid}/${project.user_id}/${daysLeft}`);
      else if (e.target.name === 'edit')
          navigate(`/manage/edit/${project.pid}`);
      else if (e.target.name === 'funds')
          navigate(`/manage/funds/${project.pid}`);
  }

  return (
    <>
      <Card  className='project-card'>
         <Card.Img variant="top" className='project-card-img' src={project.img_url} />
         <Card.Body>
            <Card.Title>{project.title}</Card.Title>
            <Card.Text className='mb-2'>{project.company}</Card.Text>
            <Card.Text className='mb-1'><span className='kanit-bold'>
                {(daysLeft > 0 ? (`${daysLeft} day`+ (singleDay?(''):('s')) + ' left' ):('Project Closed'))} ● </span>
                {`${project.fundRatio}% funded`}
            </Card.Text>
            <ProgressBar className='mb-2' variant={'success'} now={project.fundRatio} />
            <ButtonGroup>
            <Button variant={(manage)?("outline-danger"):("primary")} name="view" onClick={redirectProjectPage}>View</Button>
                  {manage &&
                     <>
                       <Button  variant="outline-danger" name="edit" onClick={redirectProjectPage}>Edit</Button>
                       <Button  variant="outline-danger" name="funds" onClick={redirectProjectPage}>Track Funds</Button>
                     </>        
                  }
            </ButtonGroup>
         </Card.Body>
      </Card>
    </>
  )
}

export default ProjectCard