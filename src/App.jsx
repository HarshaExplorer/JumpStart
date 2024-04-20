
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import Menu from './components/Menu'
import Home from './routes/Home'
import About from './routes/About'
import Discover from './routes/Discover'
import Manage from './routes/Manage'
import Register from './routes/Register'
import Auth from './routes/Auth'


const router = createBrowserRouter([
    {
      element: <Menu />,
      children: [
        {
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
          element: <Manage />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/authenticate",
          element: <Auth />
        }
      ]
    }
]);

function App() {
  return (
      <>
        <RouterProvider router={router}/>
      </>
  );
}

export default App;
