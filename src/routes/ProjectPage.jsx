import React from 'react'
import { useParams } from 'react-router-dom'

const ProjectPage = () => {
  const {pid} = useParams();

  return (
    <div>Project Page: {pid}</div>
  )
}

export default ProjectPage