import { Outlet, Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./menu.css"

const Menu = ({token}) => {
    return (
       <>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
             <div className="logo-space">
               <Navbar.Brand> <span className="mono-logo"> <span className="logo-color">Jump</span>Start</span> </Navbar.Brand>
             </div>
             <Nav className="me-auto">
               <Nav.Link > <Link to="/" className="nlink-reset"> <span className="sanchez-regular nlink">Home</span> </Link></Nav.Link>
               <div className="nav-space"></div>
               <Nav.Link > <Link to="/about" className="nlink-reset"> <span className="sanchez-regular nlink">About</span> </Link></Nav.Link>
               <div className="nav-space"></div>
               <Nav.Link > <Link to="/discover" className="nlink-reset"> <span className="sanchez-regular nlink">Discover</span> </Link></Nav.Link>
               <div className="nav-space"></div>
               {token && <Nav.Link > <Link to="/manage" className="nlink-reset"> <span className="sanchez-regular nlink">Manage</span> </Link></Nav.Link>}
             </Nav>

             <Nav className="ml-auto">
               <Nav.Link className="ml-auto"> <Link to="/register" className="auth-link-reset"> <span className="sanchez-regular auth-link">Sign&nbsp;Up</span> </Link></Nav.Link>
               <Nav.Link>|</Nav.Link>
               <Nav.Link className="ml-auto"> <Link to="/authenticate" className="auth-link-reset"> <span className="sanchez-regular auth-link">Log&nbsp;In</span> </Link></Nav.Link>
             </Nav>
          </Container>
        </Navbar>

        <Outlet />
       </>
    );
}

export default Menu;