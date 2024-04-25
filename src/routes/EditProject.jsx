import React, {useEffect, useState} from 'react';
import { useParams} from 'react-router-dom';
import MakeProject from './MakeProject';
import database from '../client';

const EditProject = ({token}) => {

  const {pid} = useParams();
  const [project, setProject] = useState(false);

  useEffect(()=>{
     const getProject = async () => {
         const {data, error} = await database.from('projects').select().eq('pid', pid);
         setProject(data[0]);
     }

     getProject();

  }, []);

  return (
    <>
       {project && 
           <MakeProject project={project} token={token}/>
       }
    </>
  )
}

export default EditProject