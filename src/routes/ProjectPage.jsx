import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {Stack, Image, Row, Col, Container} from 'react-bootstrap'
import './ProjectPage.css'
import Compass from '../assets/compass.png'
import database from '../client';


const ProjectPage = () => {
  const navigate = useNavigate();
  const {pid} = useParams();
  const [project, setProject] = useState(false);
  
  useEffect(()=>{
     const getProject = async () => {
        const {data, error} = await database.from('projects').select().eq('pid',pid);
        
        if(data)
          setProject(data[0]);
     }
     getProject();

  },[]);

  return (
    <>
      {project && 
          <Stack gap={4}>
              <h1 className='abril-fatface-regular mt-3 mx-auto'>{project.title}</h1>
              <hr />
             <Stack direction='horizontal' gap={3}>
                <Image className='mx-auto p-2' src={project.img_url} width='25%' height='25%' fluid rounded/>
                <Stack direction='vertical' className='mx-auto'>
                     <h3><Image src={Compass} width='25px'  height='25px'/> <span className='teko-category p-2'>{ project.category}</span></h3>
                     <h2 className='mt-2 money'>{`$${(project.amt_pledged).toLocaleString()} Pledged`} <h4 style={{display: 'inline', color:'black'}}>of {`$${project.amt_requested} goal.`}</h4></h2>
                     <p className='mt-2'>{project.text}</p>
                </Stack>
             </Stack>

             
          </Stack>
      }

    </>
  )
}

export default ProjectPage