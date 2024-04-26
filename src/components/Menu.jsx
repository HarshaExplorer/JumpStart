import { Outlet, Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import "../styles/menu.css";
import { motion } from "framer-motion";

const Menu = ({ token }) => {
  return (
    <>
      <Navbar bg="dark" expand="sm" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            {" "}
            <motion.span
              className="mono-logo"
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 100 }}
              transition={{ delay: 0.1 }}
            >
              {" "}
              <span className="logo-color">Jump</span>
              Start
            </motion.span>{" "}
          </Navbar.Brand>

          <Nav className="mx-auto">
            <Nav.Link>
              {" "}
              <Link to="/" className="nlink-reset px-2">
                {" "}
                <span className="sanchez-regular nlink">Home</span>{" "}
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
            {token && (
              <Nav.Link>
                {" "}
                <Link to="/start-project" className="nlink-reset px-2">
                  {" "}
                  <span className="sanchez-regular nlink">
                    Start Project
                  </span>{" "}
                </Link>
              </Nav.Link>
            )}
          </Nav>

          <Nav className=" ml-auto justity-content-center">
            {!token && (
              <Nav.Link>
                {" "}
                <Link to="/register" className="auth-link-reset">
                  {" "}
                  <span className="sanchez-regular auth-link">
                    Sign&nbsp;Up
                  </span>{" "}
                </Link>
              </Nav.Link>
            )}
            {!token && (
              <Nav.Link>
                {" "}
                <Link to="/authenticate" className="auth-link-reset">
                  {" "}
                  <span className="sanchez-regular auth-link">
                    Log&nbsp;In
                  </span>{" "}
                </Link>
              </Nav.Link>
            )}
            {token && (
              <Nav.Link>
                {" "}
                <Link to="/logout" className="auth-link-reset">
                  {" "}
                  <span className="sanchez-regular auth-link">
                    Log&nbsp;Out
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
