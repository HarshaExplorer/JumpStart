import React, {useState, useEffect} from 'react'
import {Button, Form, Stack} from 'react-bootstrap'
import database from '../client';
import './menu.css'

const QueryTool = ({resultSet, setResultSet}) => { 
  
  useEffect(()=>{handleSubmit();},[]);
  const [searchQuery, setSearchQuery] = useState({
      search: '',
      category: 'all',
  });

 const handleFilters = (e) => {
      setSearchQuery({
         ...searchQuery, [e.target.name]:e.target.value
      });
  }
  
  const handleFundFilter = (e) => {
     let sortedProjects = []

     if(e.target.checked){
       sortedProjects = [...resultSet].sort((a,b)=>{
         return b.fundRatio-a.fundRatio;
        });
      }
      else
      sortedProjects = [...resultSet].sort((a,b)=>{
          return a.fundRatio-b.fundRatio;
        });
      setResultSet(sortedProjects);  
  }

  const handleSubmit = async (e) => {

      var query =  database.from('projects').select();

      if(searchQuery.category !== 'all')
        query = query.eq('category', `${searchQuery.category}`);
      
      if(searchQuery.search !== '') 
         query = query.ilike('title',`%${searchQuery.search.trim()}%`);
      
      const {data, error} = await query;
      data.map((e)=>{
         const diff = e.amt_requested - e.amt_pledged; 
         e.fundRatio = (diff > 0) ? (Math.trunc((e.amt_pledged*100/e.amt_requested))) : (100);
         return e;
      });
      
      setResultSet(data);
  }

  const handleReset = (e) => {
     setSearchQuery({     
         search: '',
         category: 'all',
      });
      
      handleSubmit();
  }

  return (
    <>
    <Stack direction='vertical'>
      <h3 className='kanit-bold mt-4 text-center'>Discover & Bring Projects to Life.</h3>
      <Stack direction='horizontal' className='p-3' gap={3}>
           
          <Form.Select className='w-50' name="category" value={searchQuery.category} onChange={handleFilters}>
              <option value="all">Select Category</option>
              <option value="Art">Art & Crafts</option>
              <option value="Books">Books</option>
              <option value="Games">Games</option>
              <option value="Fashion">Fashion</option>
              <option value="Food">Food</option>
              <option value="Film">Films</option>
          </Form.Select>
          
          <Form.Control  className='me-auto' name="search" type='text' value={searchQuery.search} onChange={handleFilters} placeholder='Search projects and businesses' />

          <Button variant="outline-success" onClick={handleSubmit}>Submit</Button>
          <div className="vr" />
          <Button variant="outline-danger" onClick={handleReset}>Reset</Button>

      </Stack>
      <hr />
      </Stack>

      <div className='d-flex flex-row-reverse'>
           <div className='p-3'>
              <Form.Check type="switch" onChange={handleFundFilter} label="Most Funded"/>
           </div>
      </div>
    </>
  )
}

export default QueryTool