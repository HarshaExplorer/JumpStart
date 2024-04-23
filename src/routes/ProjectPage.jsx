import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {Stack, Image, Row, Col, Container} from 'react-bootstrap'
import './ProjectPage.css'
import Compass from '../assets/compass.png'
import database from '../client';
import { DEFAULT_BREAKPOINTS } from 'react-bootstrap/esm/ThemeProvider'


const ProjectPage = () => {
  const navigate = useNavigate();
  const {pid} = useParams();
  const [project, setProject] = useState(false);
  const [backersCount, setBackersCount] = useState(0);

  useEffect(()=>{
     document.body.style.backgroundColor = '#d2d4d6';

     const getProject = async () => {
        const {data, error} = await database.from('projects').select().eq('pid',pid);
        
        if(data)
          setProject(data[0]);

        const backerData = await database.from('funds').select("backer_id", {distinct: 'true', count: 'exact', head: true}).eq('project_id', pid);
        
        if(backerData && backerData.count)
           setBackersCount(backerData.count)
        
     }
     getProject();
     
     return () => {
      document.body.style.backgroundColor = '#27e690';
     }

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
                     <h3>💼 <span className='teko-category p-2'>{project.company}</span></h3>
                     <h3>🤝 <span className='teko-category p-2'><h2 style={{display:'inline'}}>{backersCount} </h2>Backers</span></h3>
                     <h2 className='mt-2 money'>{`$${(project.amt_pledged).toLocaleString()} Pledged`} <h4 style={{display: 'inline', color:'black'}}>of {`$${project.amt_requested} goal.`}</h4></h2>
      
                     <p className='mt-2'>{project.text}</p>
                     <hr width="50%"className='mx-auto hr-separator' />
                    
                </Stack>
             </Stack>
          </Stack>
      }

    </>
  )
}

export default ProjectPage