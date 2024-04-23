import React, { useState, useEffect } from 'react'
import { useParams} from 'react-router-dom'
import {Stack, Image, Form, InputGroup, Button} from 'react-bootstrap'
import './ProjectPage.css'
import Compass from '../assets/compass.png'
import database from '../client';



const ProjectPage = ({token}) => {
  const {pid, user_id} = useParams();
  const [project, setProject] = useState(false);
  const [backersCount, setBackersCount] = useState(0);
  const [backerFund, setBackerFund] = useState('');
  const [projectEmail, setProjectEmail] = useState('');

  const handleBackerFund = async () => {;
      if(backerFund <= 0 || backerFund > (project.amt_requested-project.amt_pledged))
         alert('Funds should be minimum $1 and cannot exceed $'+(project.amt_requested-project.amt_pledged).toLocaleString()+"!");
      else if(token.user.id===project.user_id)
          alert('Cannot fund your own project!');
      else{
        const response = window.confirm("You are willing to fund $" + backerFund.toLocaleString() + "?");
        if (response){
            let totalFund = Number(project.amt_pledged) + Number(backerFund);
            let error = await database.from('funds').insert({backer_id: token.user.id, project_id: pid, amt: backerFund});
                error = await database.from('projects').update({amt_pledged: totalFund}).eq('pid', pid);
         const {data} = await database.from('users').select().eq('id', token.user.id);
                error = await database.from('users').update({total_pledged: Number(data[0].total_pledged) + Number(backerFund)}).eq('id', token.user.id);

          if(!error.error){
             alert('Fund Transfer Successful!');
             window.location.reload();
          }
        }
          
      }
        
      setBackerFund('');
  }

  useEffect(()=>{

     const getProject = async () => {
        const {data, error} = await database.from('projects').select().eq('pid',pid);
        
        if(data)
          setProject(data[0]);

        const backerData = await database.from('funds').select("backer_id", {distinct: 'true', count: 'exact', head: true}).eq('project_id', pid);
        
        if(backerData && backerData.count)
           setBackersCount(backerData.count)

        const creatorEmail = await database.from('users').select().eq('id',user_id);
        console.log(creatorEmail)
        if(creatorEmail && creatorEmail.data)
           setProjectEmail(creatorEmail.data[0].email);
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
                     <h3>🏢 <span className='teko-category p-2'>{project.company}</span></h3>
                     <h3>📧 <span className='teko-category p-2'>{projectEmail}</span></h3>
                     <h3>🤝 <span className='teko-category p-2'><h2 style={{display:'inline'}}>{backersCount.toLocaleString()} </h2>Backers</span></h3>
                     <h2 className='mt-2 money'>{`$${(project.amt_pledged).toLocaleString()} Pledged`} <h4 style={{display: 'inline', color:'black'}}>of {`$${project.amt_requested} goal.`}</h4></h2>
                     <p className='mt-2'>{project.text}</p>
                     
                     <InputGroup className="m-2 mx-auto" style={{width:'80%'}}>
                            <Button variant="success" className='backer-submit' onClick={handleBackerFund} disabled={token?(false):(true)}>
                               Back this project
                            </Button>
                            <Form.Control type="number" className='backer-input-shadow' value={backerFund} onChange={(e)=>{setBackerFund(e.target.value)}} placeholder={`Enter dollar amount ($${project.amt_requested-project.amt_pledged} max)`} disabled={token?(false):(true)} max={project.amt_requested-project.amt_pledged} />
                       </InputGroup>

                       {!token && <p className='mx-auto alert'>*must be logged in to contribute funds</p>}
                    
                </Stack>
             </Stack>
          </Stack>
      }

    </>
  )
}

export default ProjectPage