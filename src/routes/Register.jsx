import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Button, Form} from 'react-bootstrap'
import database from '../client.js'
import './Auth.css'

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
       email:'', password:'', fullname:''
  })

  const handleChange = (e) => {
     setFormData({...formData, [e.target.name]:e.target.value});
  }

  const handleSubmit = async (e) => {
     e.preventDefault();

     
    if (formData.password === formData.password.toLowerCase() || formData.password === formData.password.toUpperCase() || formData.password.length < 6){
          alert('Password needs to be atleast 6 characters long with mix of numbers and upper and lower case letters.');
          return;
    }
     

     try{
       var {data, error} = await database.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
             data: {
               fullname: formData.fullname
             }
          }
       });

       alert('Please check your email for verification link!');
       navigate('/authenticate');
     }
     catch(error){
       alert(error);
       navigate('/register');
     }
  }

  

  return (
   <div className='login-container mx-auto'>
    <div className='container justity-content-center align-items-center'>
       <h3 className='kanit-bold pb-3'>We're glad you're joining us!</h3>
       <Form onSubmit={handleSubmit}>

         <Form.Group className="mb-3" controlId="formName">
           <Form.Control type="text" name="fullname" placeholder="Full name" onChange={handleChange}/>
         </Form.Group>

         <Form.Group className="mb-3" controlId="formEmail">
           <Form.Control type="email" name="email" placeholder="Email" onChange={handleChange}/>
         </Form.Group>
   
         <Form.Group className="mb-3 pb-3" controlId="formPassword">
           <Form.Control type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange}/>
         </Form.Group>
   
         <Button className="btn-success" type="submit">
            Sign In
         </Button>
       </Form>
    </div>
  </div> 
  );
}

export default Register;