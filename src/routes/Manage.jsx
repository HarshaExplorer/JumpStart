import React from 'react'
import { Navigate } from 'react-router-dom'

const Manage = ({token}) => {

  if(!token){
    return (
      <Navigate to='/authenticate' replace/>
    )
  }

  return (
          <>
            
          </>
         )
}

export default Manage;