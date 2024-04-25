import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {Stack, Button, Form} from 'react-bootstrap'
import validator from 'validator'
import database from '../client'
import '../styles/MakeProject.css'

const MakeProject = ({token, project=false}) => {
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        category: (project)?(project.category):('Art'),
        title: (project)?(project.title):(''),
        text: (project)?(project.text):(''),
        img_url: (project)?(project.img_url):(''),
        amt_requested: (project)?(project.amt_requested):(''),
        deadline: (project)?(project.deadline):(''),
        company: (project)?(project.company):('')
    });

    const updateProject = (e) => { setFormData({...formData, [e.target.name]:e.target.value});}

    const validateProject = async() => {
      const textLength = formData.text.split(" ").filter((s)=>{return (s.trim()!=='')}).length;
      const today = new Date();
      const maxDeadline = new Date();
      maxDeadline.setDate(today.getDate() + 90);
      const deadline = new Date(formData.deadline);

        if (formData.title.trim().length < 1)
           alert('Project title (step 2) cannot be empty!');
        else if(textLength < 100)
           alert('Project text (step 3) must be minimum 100 words!');
        else if(!validator.isURL(formData.img_url.trim()))
           alert('Project Image URL (step 4) is invalid!');
        else if(formData.amt_requested < 100)
           alert('Project\'s target fund (step 5) must be minimum $100.');
        else if(!(today < deadline &&  deadline < maxDeadline))
           alert('Project deadline (step 6) must be within 3 months from today!');
        else if(formData.company.trim().length < 1)
           alert('Project\'s company/business name (step 7) should not be empty!')
        else{
          let data, error;
         
          if(project){
               const proj = await database.from('projects').update({
                                                      category: formData.category,
                                                      company: formData.company,
                                                      deadline: formData.deadline,
                                                      text: formData.text,
                                                      title: formData.title,
                                                      img_url: formData.img_url,
                                                      amt_requested: formData.amt_requested,
                                                    }).eq('pid',project.pid).select();
               data  = proj.data;
               error = proj.error;
            }
            else{
               const proj = await database.from('projects').insert({
                  user_id: token.user.id,
                  category: formData.category,
                  company: formData.company,
                  deadline: formData.deadline,
                  text: formData.text,
                  title: formData.title,
                  img_url: formData.img_url,
                  amt_requested: formData.amt_requested 
                }).select();

               data  = proj.data;
               error = proj.error;
            }

          if(!error){
             const daysLeft = Math.round((Date.parse(formData.deadline) - today) / (1000*60*60*24)) + 1;
              if(!project)
                 alert('Project Created Successfully! Now go share it with your network.');
              else
                 alert('Project Updated Successfully!');   

              navigate(`/discover/${data[0].pid}/${token.user.id}/${daysLeft}`);

          }else{
            alert('Project cannot be created due to database error. Please try again later.')
            navigate(`/discover`);
          }
        
            
        }
        
    }
  useEffect(()=>{
     document.body.style.backgroundColor = "'#272b33";
  },[]);

  return (
      <>
      {token &&
        <Stack className='p-4 mx-auto' gap={3} data-bs-theme='dark'>
         {project ?(<h2 className='heading kanit-bold'>Edit Project</h2>)
                   :(<h2 className='heading kanit-bold'>Got a project? We'll bring it to life.</h2>)
         }
          <hr className='ruler mb-5'/>

          <h4 className='help-text bebas-neue-regular'><span className='logo-color'>Step 1</span> - Pick a suitable category: </h4>
          <Form.Select className='w-50 filter-border mx-auto mb-5' width='50%' name="category" value={formData.category} onChange={updateProject}>
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
          <Form.Control type="text" className='w-50 filter-border mx-auto mb-5' value={formData.title} name='title' placeholder='Enter Project Title' onChange={updateProject}/>

          <h4 className='help-text bebas-neue-regular'><span className='logo-color'>Step 3</span> - Tell your story: <h6>(Minimum 100 words)</h6></h4>
          <Form.Control as="textarea" name='text' value={formData.text} className='w-50 filter-border text-input mx-auto mb-5' placeholder="What's the purpose of doing this project? Be elaborate." onChange={updateProject}/>
        
          <h4 className='help-text bebas-neue-regular'><span className='logo-color'>Step 4</span> - Design a captivating cover image: </h4>
          <Form.Control type="text" name='img_url' value={formData.img_url} className='w-50 filter-border mx-auto mb-5' placeholder='Image URL' onChange={updateProject}/>

          <h4 className='help-text bebas-neue-regular'><span className='logo-color'>Step 5</span> - What's the goal amount? <h6>(Your project will only be funded if it reaches its goal by the deadline)</h6></h4>
          <Form.Control type="number" min="100" name='amt_requested' value={formData.amt_requested} className='w-50 filter-border mx-auto mb-5' placeholder='Enter Dollar Amount (starting at $100)' onChange={updateProject}/>
   
          <h4 className='help-text bebas-neue-regular'><span className='logo-color'>Step 6</span> - Set a deadline: <h6>(Don't go beyond 3 months)</h6></h4>
          <Form.Control type="date" name='deadline' value={formData.deadline} className='w-50 filter-border mx-auto mb-5' onChange={updateProject}/>

          <h4 className='help-text bebas-neue-regular'><span className='logo-color'>Step 7</span> - Lastly, what's your company/business name?</h4>
          <Form.Control type="text" name='company' value={formData.company} className='w-50 filter-border mx-auto mb-5' placeholder='For instance, RobinHood Inc...' onChange={updateProject}/>

          <Button variant={(project)?('outline-danger'):('outline-success')} className="jump-start-btn mx-auto" onClick={validateProject}>
            {!project &&
               <span className="mono-logo"> <span className="logo-color">Jump</span>Start your project!</span> 
            }
            {project &&
               <span className="mono-logo">Submit Changes</span> 
            }
         </Button>

        </Stack>
        }

        {!token &&
            <Navigate to='/authenticate' replace/>
        }
      </>
  )
}

export default MakeProject