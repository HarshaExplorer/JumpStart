import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Button, Form} from 'react-bootstrap'
import database from '../client.js'
import '../styles/Auth.css'

const ResetEmail = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
       email:''
  })

  const handleChange = (e) => {
     setFormData({...formData, [e.target.name]:e.target.value});
  }

  const handleSubmit = async (e) => {
     e.preventDefault();

     try{
       var {data, error} = await database.auth.resetPasswordForEmail(
          formData.email
       );
       
       if(data){
          alert('Please check your email for password reset link!');
          navigate('/authenticate');
       }
     }
     catch(error){
       alert(error);
       navigate('/reset-password');
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
       <h3 className='kanit-bold pb-3'>Forgot your password? It happens... </h3>
       <Form onSubmit={handleSubmit}>

         <Form.Group className="mb-3" controlId="formEmail">
           <Form.Control type="email" name="email" placeholder="Email" onChange={handleChange}/>
         </Form.Group>
  
         <Button className="btn-success" type="submit">
            Send Reset Link
         </Button>
       </Form>
    </div>
  </div> 
  );
}

export default ResetEmail