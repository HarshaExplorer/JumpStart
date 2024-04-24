import React, {useState} from 'react'
import {Navigate} from 'react-router-dom'
import QueryTool from '../components/QueryTool'
import ProjectCard from '../components/ProjectCard'
import {Col, Row} from 'react-bootstrap'
import './Manage.css'

const Manage = ({token}) => {
  const [resultSet, setResultSet] = useState(false);
  let manage = false;

  if (token){
     manage = {
         header: 'Here you can track & refine your projects.',
         headerMarginTop: '',
         user: token.user.id
      }
  }

  return (
          <>
            {token &&
              <div data-bs-theme='dark' className='manage-container'>
                <h3 className='kanit-bold text-center' style={{color:'white'}}>Welcome{(token.user.identities[0].identity_data.fullname)?(', '+token.user.identities[0].identity_data.fullname):('')}!</h3>

                <QueryTool resultSet={resultSet} setResultSet={setResultSet} manage={manage}/>
                <Row md={3} sm={2} lg={4}  className='g-4 p-2'>
                     {resultSet && resultSet.map((p)=>{
                       return(
                        <Col key={p.pid} md>
                           <ProjectCard project={p} />
                        </Col>
                       );
                     })}
                </Row> 
              </div> 
            }

           {!token && <Navigate to='/authenticate' replace/>}
          </>
         )
}

export default Manage;