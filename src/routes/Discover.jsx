import React, {useState, useEffect} from 'react'
import {Button, FloatingLabel, Form, Stack} from 'react-bootstrap'

const Discover = () => {
  
  const [searchQuery, setSearchQuery] = useState({
     search: '',
     category: '',
     popularity: ''
  });

  useEffect(() => {
    document.body.style.backgroundColor = "#78f0ba";
    return () => {
       document.body.style.backgroundColor = "white";
    }
  }, [])
  

  return (
    <>
      <Stack direction='horizontal' className='mt-4 p-3' gap={3}>
           
              <Form.Select className='w-50'>
                  <option value="all">Select Category</option>
                  <option value="Art">Art & Crafts</option>
                  <option value="Books">Books</option>
                  <option value="Games">Games</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Food">Food</option>
                  <option value="Film">Films</option>
              </Form.Select>
          
          <Form.Control controlId='search' className='me-auto' type='text' placeholder='Search projects and businesses' />
          <Button variant="outline-primary">Submit</Button>
          <div className="vr" />
          <Button variant="outline-danger">Reset</Button>
      </Stack>
      <hr />
      <div className='d-flex flex-row-reverse'>
           <div className='p-3'>
              <Form.Check type="switch" label="Most Funded"/>
           </div>
      </div>
    </>
  )
}

export default Discover