import { Outlet, Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./menu.css";

const Menu = ({ token }) => {
  return (
    <>
      <Navbar bg="dark" expand="sm" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            {" "}
            <span className="mono-logo">
              {" "}
              <span className="logo-color">Jump</span>Start
            </span>{" "}
          </Navbar.Brand>

          <Nav className="mx-auto">
            <Nav.Link>
              {" "}
              <Link to="/" className="nlink-reset px-2">
                {" "}
                <span className="sanchez-regular nlink">Landing</span>{" "}
              </Link>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <Link to="/about" className="nlink-reset px-2">
                {" "}
                <span className="sanchez-regular nlink">About</span>{" "}
              </Link>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <Link to="/discover" className="nlink-reset px-2">
                {" "}
                <span className="sanchez-regular nlink">Discover</span>{" "}
              </Link>
            </Nav.Link>
            {token && (
              <Nav.Link>
                {" "}
                <Link to="/manage" className="nlink-reset px-2">
                  {" "}
                  <span className="sanchez-regular nlink">Manage</span>{" "}
                </Link>
              </Nav.Link>
            )}
          </Nav>

          <Nav className=" ml-auto justity-content-center">
            <Nav.Link>
              {" "}
              <Link to="/register" className="auth-link-reset">
                {" "}
                <span className="sanchez-regular auth-link">Sign Up</span>{" "}
              </Link>
            </Nav.Link>
            {!token && (
              <Nav.Link>
                {" "}
                <Link to="/authenticate" className="auth-link-reset">
                  {" "}
                  <span className="sanchez-regular auth-link">Log In</span>{" "}
                </Link>
              </Nav.Link>
            )}
            {token && (
              <Nav.Link>
                {" "}
                <Link to="/logout" className="auth-link-reset">
                  {" "}
                  <span className="sanchez-regular auth-link">
                    Log Out
                  </span>{" "}
                </Link>
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default Menu;
