import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import QueryTool from '../components/QueryTool'
import ProjectCard from '../components/ProjectCard'
import '../styles/menu.css'

const Discover = () => {
  
  const [resultSet, setResultSet] = useState(false);
  
  return (
    <div className='discover-page' data-bs-theme='dark'>
       <QueryTool resultSet={resultSet} setResultSet={setResultSet} />
       
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
  )
}

export default Discover