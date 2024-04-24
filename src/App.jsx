import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import Menu from './components/Menu'
import Home from './routes/Home'
import About from './routes/About'
import Discover from './routes/Discover'
import Manage from './routes/Manage'
import Register from './routes/Register'
import Auth from './routes/Auth'
import ResetEmail from './routes/ResetEmail'
import ResetPassword from './routes/ResetPassword'
import Logout from './routes/Logout'
import BadRequest from './components/BadRequest'
import ProjectPage from './routes/ProjectPage'
import MakeProject from './routes/MakeProject'
import EditProject from './routes/EditProject'
import FundViewer from './routes/FundViewer';

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
          path: "discover/:pid/:user_id/:project_life",
          element: <ProjectPage token={token} />
      },
      {
        path: "/manage",
        element: <Manage token={token} />
      },
      {
        path: "/manage/edit/:pid",
        element: <EditProject token={token} />
      },
      {
        path: "/manage/funds/:pid",
        element: <FundViewer token={token} />
      },
      {
        path: "/start-project",
        element: <MakeProject token={token} />
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
        path: "/update-password",
        element: <ResetPassword />
      },
      {
        path: "/logout",
        element: <Logout token={token} setToken={setToken} />
      },
      {
        path: "*",
        element: <BadRequest />
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
