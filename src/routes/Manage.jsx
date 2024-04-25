import React, {useEffect, useState} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import QueryTool from '../components/QueryTool'
import ProjectCard from '../components/ProjectCard'
import {Col, Row} from 'react-bootstrap'
import './Manage.css'

const Manage = ({token=false}) => {
  const [resultSet, setResultSet] = useState(false);
  let manage = false;
  
  const navigate = useNavigate();
  
  if (token){
     manage = {
         header: 'Here you can track & refine your projects.',
         headerMarginTop: '',
         user: token.user.id
      }
      console.log(token);
  }
  else if(!token){
    setTimeout(()=>{navigate('/authenticate')}, 50);
  }


  useEffect(()=>{
    document.body.style.backgroundColor = '#272b33';
  }, []);
  
  return (
          <>
            {token &&
              <div data-bs-theme='dark' className='manage-container'>
                <h3 className='kanit-bold text-center' style={{color:'white'}}>Welcome{(token.user.identities[0].identity_data.fullname)?(', '+token.user.identities[0].identity_data.fullname):('')}!</h3>

                <QueryTool resultSet={resultSet} setResultSet={setResultSet} manage={manage}/>
                <Row md={4} sm={2} className='g-4 p-2'>
                     {resultSet && resultSet.map((p)=>{
                       return(
                        <Col key={p.pid} md>
                           <ProjectCard project={p} manage={true}/>
                        </Col>
                       );
                     })}
                </Row> 
              </div>
            }
          </>
        );
}

export default Manage;