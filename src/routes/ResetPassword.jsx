import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Button, Form} from 'react-bootstrap'
import database from '../client.js'
import '../styles/Auth.css'

const ResetPassword = () => {

    const navigate = useNavigate();
   
    const [formData, setFormData] = useState({
         password:''
    })
  
    const handleChange = (e) => {
       setFormData({...formData, [e.target.name]:e.target.value});
    }
  
    const handleSubmit = async (e) => {
       e.preventDefault();
  
       try{
         var {data, error} = await database.auth.updateUser({
            password: formData.password
       });
         
         if(data){
            alert('Password Reset Successful!');
            navigate('/authenticate');
         }
         if(error){
            alert(error);
            navigate('/');
         }
       }
       catch(error){
         alert(error);
         navigate('/');
       }
    }
  
    useEffect(()=>{ document.body.style.backgroundColor = '#78f0ba';   
       return () => {
        document.body.style.backgroundColor = '#272b33'
       }
     },[]);  
  
    return (
     <div className='login-container mx-auto'>
      <div className='container justity-content-center align-items-center'>
         <h3 className='kanit-bold pb-3'>Enter your new password: </h3>
         <Form onSubmit={handleSubmit}>
  
           <Form.Group className="mb-3" controlId="formEmail">
             <Form.Control type="text" name="password" placeholder="new password" onChange={handleChange}/>
           </Form.Group>
    
           <Button className="btn-success" type="submit">
              Reset
           </Button>
         </Form>
      </div>
    </div> 
    );
}

export default ResetPassword