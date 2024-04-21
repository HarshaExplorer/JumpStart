import React, {useEffect} from 'react'
import './menu.css'

const BadRequest = () => {

  useEffect(() => {
    document.body.style.backgroundColor = "#de4c35";
    return () => {
       document.body.style.backgroundColor = "white";
    }
  }, [])

  return (
    <div className='bad-container mx-auto'>
      <div className='container justity-content-center align-items-center'>
         <h3 className='kanit-bold pb-3'>It's code 404... No trespassing please! </h3>
      </div>
    </div>
  )
}

export default BadRequest