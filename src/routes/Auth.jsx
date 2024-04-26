import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Button, Form} from 'react-bootstrap'
import { Typewriter } from 'react-simple-typewriter'
import database from '../client.js'
import '../styles/Auth.css'


const Auth = ({setToken, token}) => {
  const navigate = useNavigate();

  const updatedb = async (data) => {
   const userin = await database.from('users').select().eq('id',`${data.user.id}`);
   if(userin.data.length === 0)
      await database.from('users').insert({id: data.user.id, email: `${data.user.email}`, full_name: `${data.user.user_metadata.fullname}`});
  }

  if(token){
   setTimeout(()=>{navigate('/manage', {replace:true});}, 20);
  }

  const [formData, setFormData] = useState({
       email:'', password:''
  })

  const handleChange = (e) => {
     setFormData({...formData, [e.target.name]:e.target.value});
  }

  const handleSubmit = async (e) => {
     e.preventDefault();

     try{
       const {data, error} = await database.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
       });

        if(data.user){
           setToken(data);
           updatedb(data);
           navigate('/manage', {replace: true});
        }
        else {
           setFormData({...formData, password:''});
           alert("Incorrect email or password!");
           navigate('/authenticate');
        }
     }
     catch(error){
       alert(error);
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
       <h3 className='kanit-bold pb-3'>
             <Typewriter 
                  words={["Welcome!  Ready to Jump in?"]}
                  loop={1}
                  cursor
                  typeSpeed={50}
             />  
        </h3>

       <Form onSubmit={handleSubmit}>
         <Form.Group className="mb-3" controlId="formEmail">
           <Form.Control type="email" name="email" placeholder="Email" onChange={handleChange}/>
         </Form.Group>
   
         <Form.Group className="mb-3 pb-3" controlId="formPassword">
           <Form.Control type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange}/>
           <Link to="/reset-password">Forget your password?</Link>
         </Form.Group>
   
         <Button className="btn-success" type="submit">
            Log In
         </Button>
       </Form>
    </div>
  </div> 
  );
}

export default Auth;