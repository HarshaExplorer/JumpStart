import React from 'react'
import { Navigate } from 'react-router-dom'
import {Stack, Button, Form, Container } from 'react-bootstrap'
import './MakeProject.css'
import database from '../client'

const MakeProject = ({token}) => {
  
    if(!token){
        return (
          <Navigate to='/authenticate' replace/>
        )
    }

  return (
      <>
        <Stack className='p-4 mx-auto' gap={3} data-bs-theme='dark'>
          <h2 className='heading kanit-bold'>Got a project? We'll bring it to life.</h2>
          <hr className='ruler mb-5'/>

          <h4 className='help-text bebas-neue-regular'><span className='logo-color'>Step 1</span> - Pick a suitable category: </h4>
          <Form.Select className='w-50 filter-border mx-auto mb-5' width='50%' name="category">
             <option value="Art">Art & Crafts</option>
             <option value="Books">Books</option>
             <option value="Games">Games</option>
             <option value="Fashion">Fashion</option>
             <option value="Food">Food</option>
             <option value="Film">Films</option>
             <option value="Life Style">Life Style</option>
             <option value="Nature & Environment">Nature & Environment</option>
             <option value="Technology">Technology</option>
          </Form.Select>
      
          <h4 className='help-text bebas-neue-regular'><span className='logo-color'>Step 2</span> - A Catchy title: </h4>
          <Form.Control type="text" className='w-50 filter-border mx-auto mb-5' placeholder='Enter Project Title' />

          <h4 className='help-text bebas-neue-regular'><span className='logo-color'>Step 3</span> - Tell your story: </h4>
          <Form.Control as="textarea" className='w-50 filter-border text-input mx-auto mb-5' placeholder="What's the purpose of doing this project? Be elaborate."/>
        
          <h4 className='help-text bebas-neue-regular'><span className='logo-color'>Step 4</span> - Design a captivating cover image: </h4>
          <Form.Control type="text" className='w-50 filter-border mx-auto mb-5' placeholder='Image URL' />

          <h4 className='help-text bebas-neue-regular'><span className='logo-color'>Step 5</span> - What's the goal amount? <h6>(Your project will only be funded if it reaches its goal by the deadline)</h6></h4>
          <Form.Control type="number" min="100" className='w-50 filter-border mx-auto mb-5' placeholder='Enter Dollar Amount (starting at $100)' />
   
          <h4 className='help-text bebas-neue-regular'><span className='logo-color'>Step 6</span> - Set a deadline: <h6>(Don't go beyond 3 months)</h6></h4>
          <Form.Control type="date" className='w-50 filter-border mx-auto mb-5'/>

          <h4 className='help-text bebas-neue-regular'><span className='logo-color'>Step 7</span> - Lastly, what's your company/business name?</h4>
          <Form.Control type="text" className='w-50 filter-border mx-auto mb-5' placeholder='For instance, RobinHood Inc...'/>

          <Button variant="outline-success" className="jump-start-btn mx-auto">
          <span className="mono-logo"> <span className="logo-color">Jump</span>Start your project!</span> 
         </Button>

        </Stack>
      </>
  )
}

export default MakeProject