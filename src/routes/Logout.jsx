import {Navigate} from 'react-router-dom';

const Logout = ({token, setToken}) => {

  if(token){
    sessionStorage.removeItem('token');
    setToken(false);
  }


  return <Navigate to="/" replace />;
}

export default Logout;