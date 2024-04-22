import React, {useState} from 'react'
import QueryTool from '../components/QueryTool';

const Discover = () => {
  
  const [resultSet, setResultSet] = useState(false);
  
  return (
    <> 
       <QueryTool resultSet={resultSet} setResultSet={setResultSet}/>
    </>
  )
}

export default Discover