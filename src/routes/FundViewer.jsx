import React, { useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Stack, Form, Table } from 'react-bootstrap'
import './FundViewer.css'
import database from '../client'

const FundViewer = ({token}) => {

  if(!token)
     setTimeout(()=>{navigate('/authenticate')}, 20);

  const navigate = useNavigate();
  const {pid, projectTitle} = useParams();
  const [project, setProject] = useState(false);
  const [funds, setFunds] = useState(false);
  
  // false -> ascending order, true -> descending order
  const sortFunds = (DescOrder) => {
    let Sorted_data;

    if(DescOrder) 
        Sorted_data =    [...funds].sort((f1, f2) => {
                              return f2.amt - f1.amt;
                         });
    else
       Sorted_data =    [...funds].sort((f1, f2) => {
                              return f1.amt - f2.amt;
                        });
    
    setFunds(Sorted_data);
  }

  useEffect(()=>{
    document.body.style.backgroundColor = '#272b33';
    
    const getFunds = async () => {
       const {data} = await database.from('funds').select('*,users(*)').eq('project_id', pid);
       let Sorted_data = [...data].sort((f1, f2) => {
                            return f1.amt - f2.amt;
                          });
       setFunds(Sorted_data);                                                     
    }

    getFunds();
  }, []);



  return (
    <>
      {token &&

         <Stack className='p-4 mx-auto' gap={3} data-bs-theme='dark'>
             <h2 className='heading kanit-bold'>View funds pledged for <span className='logo-color'>{projectTitle}</span></h2>
             <hr className='ruler mb-3'/>

             <div className='d-flex flex-row-reverse'>
               <div className='p-3'>
                 <Form.Check type="switch" onChange={(e)=>{
                                           sortFunds(e.target.checked);
                                        }}  
                    label="Most Pledged" style={{color: 'white'}} 
                  />
               </div>
             </div>    

             <h3 className='heading kanit-bold'><span className='logo-color'>{funds.length}</span> Fund{(funds.length===1)?(''):('s')} Pledged</h3>

             <Table striped hover>
                <thead>
                   <tr>
                      <th>#</th>
                      <th>Backer</th>
                      <th>Backer Email</th>
                      <th>Date Pledged</th>
                      <th>Amount Pledged</th>
                   </tr>
                </thead>
                                
                <tbody>
                    { funds &&
                      funds.map((f, idx) => {
                         return (
                           <tr>
                              <td>{idx+1}</td>
                              <td>{f.users.full_name}</td>
                              <td>{f.users.email}</td>
                              <td>{(new Date(f.created_at)).toLocaleDateString()}</td>
                              <td>{f.amt}</td>
                           </tr>
                         );
                      })
                    }
                </tbody>

             </Table>

         </Stack>
      }
    </>
  )
}

export default FundViewer