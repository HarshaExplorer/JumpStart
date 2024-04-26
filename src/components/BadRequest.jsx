import React, {useEffect} from 'react'
import { Typewriter } from 'react-simple-typewriter'
import '../styles/menu.css'

const BadRequest = () => {

  useEffect(() => {
    document.body.style.backgroundColor = "#de4c35";
    return () => {
       document.body.style.backgroundColor = "#272b33";
    }
  }, [])

  return (
    <div className='bad-container mx-auto'>
      <div className='container justity-content-center align-items-center'>
         <h3 className='kanit-bold pb-3'>
            <Typewriter 
                  words={["It's code 404... No trespassing please! 😠"]}
                  loop={1}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
            />  
         </h3>
      </div>
    </div>
  )
}

export default BadRequest