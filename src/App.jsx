import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import Menu from './components/Menu'
import Home from './routes/Home'
import About from './routes/About'
import Discover from './routes/Discover'
import Manage from './routes/Manage'
import Register from './routes/Register'
import Auth from './routes/Auth'
import ResetEmail from './components/ResetEmail'
import Logout from './routes/Logout';

function App() {

  const [token, setToken] = useState(false);

  if(token){
     sessionStorage.setItem('token', JSON.stringify(token));
  }

  useEffect(()=>{
     if(sessionStorage.getItem('token')){
        let data = JSON.parse(sessionStorage.getItem('token'));
        setToken(data);
     }
  }, []);
  
  const router = createBrowserRouter([
  {
    element: <Menu token={token} />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/discover",
        element: <Discover />
      },
      {
        path: "/manage",
        element: <Manage token={token} />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/authenticate",
        element: <Auth setToken={setToken}/>
      },
      {
        path: "/reset-password",
        element: <ResetEmail />
      },
      {
        path: "/logout",
        element: <Logout token={token} setToken={setToken} />
      }

    ]
  }
]);

  return (
      <>
        <RouterProvider router={router}/>
      </>
  );
}

export default App;
