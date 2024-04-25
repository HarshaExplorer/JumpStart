import React from 'react'
import { Navigate } from 'react-router-dom'

const Manage = ({token}) => {

  if(token){
    return (
      <>
         <div>Manage</div>
      </>
    )
  }

  return <Navigate to='/authenticate' replace/>;
}

export default Manage;