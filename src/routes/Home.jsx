import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import your CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <div className="box admin-panel">
        <h2>Admin Panel</h2>
        <p>
          Controls to approve/decline or view properties of a project
          <p>Monitorfunds and project details.</p>
        </p>
        <Link to="/manage" className="btn btn-primary">
          Go to Admin Panel
        </Link>
      </div>
      <div className="box create-project">
        <h2>Create a Project</h2>
        <p>Where users can create their projects.</p>
        <Link to="/register" className="btn btn-primary">
          Create Project
        </Link>
      </div>
      <div className="box project-directory">
        <h2>Project Directory</h2>
        <p>Where users can look in the database for projects.</p>
        <Link to="/discover" className="btn btn-primary">
          Explore Projects
        </Link>
      </div>
      <div className="box connections">
        <h2>Connections</h2>
        <p>Connect with other people to send and receive messages.</p>
        <Link to="/connections" className="btn btn-primary">
          Connect with Others
        </Link>
      </div>
    </div>
  );
};

export default Home;
