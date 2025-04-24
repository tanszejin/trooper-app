import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import Button from "./Button";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";

function NavBar() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  function signOut() {
    if (!userLoggedIn) {
      console.log("sign out error, user not logged in");
      return;
    }
    doSignOut();
    navigate("/");
  }

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
