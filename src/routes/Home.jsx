import React, { useEffect } from 'react'

const Home = () => {

  useEffect(()=>{
    document.body.style.backgroundColor = '#272b33';
  }, []);

  return (
    <div>Home</div>
  )
}

export default Home