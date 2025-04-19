import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-title">
          trooper
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
