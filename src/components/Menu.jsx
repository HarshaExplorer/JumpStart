import { Outlet, Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./menu.css";

const Menu = ({ token }) => {
  return (
    <>
      <Navbar bg="dark" expand="sm" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <span className="mono-logo">
              <span className="logo-color">Jump</span>Start
            </span>
          </Navbar.Brand>

          <Nav className="mx-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/discover" className="nav-link">
              Discover
            </Link>
            {token && (
              <Link to="/manage" className="nav-link">
                Manage
              </Link>
            )}
          </Nav>

          <Nav className="ml-auto justity-content-center">
            <Link to="/register" className="nav-link">
              Sign Up
            </Link>
            {!token && (
              <Link to="/authenticate" className="nav-link">
                Log In
              </Link>
            )}
            {token && (
              <Link to="/logout" className="nav-link">
                Log Out
              </Link>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default Menu;
