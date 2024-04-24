import React from 'react'
import { Navigate } from 'react-router-dom'

const MakeProject = ({token}) => {
  
    if(!token){
        return (
          <Navigate to='/authenticate' replace/>
        )
      }

  return (
    <div>MakeProject</div>
  )
}

export default MakeProject