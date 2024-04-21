import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Menu from "./components/Menu";
import Landing from "./routes/Landing"; // Import Landing component
import About from "./routes/About";
import Discover from "./routes/Discover";
import Home from "./routes/Home"; // Import Home component
import Register from "./routes/Register";
import Auth from "./routes/Auth";
import ResetEmail from "./routes/ResetEmail";
import ResetPassword from "./routes/ResetPassword";
import Logout from "./routes/Logout";
import BadRequest from "./components/BadRequest";

function App() {
  const [token, setToken] = useState(false);

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
  }, []);

  const router = createBrowserRouter([
    {
      element: <Menu token={token} />,
      children: [
        {
          path: "/",
          element: <Landing token={token} setToken={setToken} />, // Change route to Landing page
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/discover",
          element: <Discover />,
        },
        {
          path: "/manage",
          element: <Home />, // Change route to Home component
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/authenticate",
          element: <Auth setToken={setToken} />,
        },
        {
          path: "/reset-password",
          element: <ResetEmail />,
        },
        {
          path: "/update-password",
          element: <ResetPassword />,
        },
        {
          path: "/logout",
          element: <Logout token={token} setToken={setToken} />,
        },
        {
          path: "*",
          element: <BadRequest />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
