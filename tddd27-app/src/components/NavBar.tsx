import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import Button from "./Button";

function NavBar() {
  function signOut() {}

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-title">
          trooper
        </Link>
        <div className="navbar-right-container">
          <Button
            onClick={signOut}
            buttonColor="btn--clear"
            buttonStyle="btn--lesspress"
            buttonSize="btn--small"
          >
            Sign out
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
