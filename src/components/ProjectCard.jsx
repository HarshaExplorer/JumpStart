import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Card, ButtonGroup, Button, ProgressBar } from 'react-bootstrap'
import database from '../client'
import "bootstrap-icons/font/bootstrap-icons.css"
import '../styles/menu.css'

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
          navigate(`/manage/funds/${project.pid}/${project.title}`);
  }

  const deleteProject = async () => {
      const remove = window.confirm(`Are you sure to delete project "${project.title}"?`);

      if(remove){
         const {error} = await database.from('projects').delete().eq('pid', project.pid);

         if(error)
            alert('Project deletion unsuccessful. Please try again later.');
         
         window.location.reload();
      }
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
            <Button variant={(manage)?("outline-light"):("primary")} name="view" onClick={redirectProjectPage}>View</Button>
                  {manage &&
                     <>
                       <Button  variant="outline-light" name="edit" onClick={redirectProjectPage}>Edit</Button>
                       <Button  variant="outline-light" name="funds" onClick={redirectProjectPage}>Track Funds</Button>
                       <Button  variant="outline-danger" onClick={deleteProject}><i className="bi bi-trash"></i></Button>
                     </>        
                  }
            </ButtonGroup>
         </Card.Body>
      </Card>
    </>
  )
}

export default ProjectCard