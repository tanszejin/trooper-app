import React from "react";
import "./AddMember.css";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Button from "../components/Button";

function AddMember() {
  const { tripId } = useParams();

  function searchUser() {}

  return (
    <>
      <NavBar navbarColor="navbar--blue"></NavBar>
      <div className="add-member-container">
        <h3>Add new member to trip</h3>
        <div className="search-user-container">
          <input
            type="text"
            placeholder="Search for a user by email..."
            className="search-user-input"
          />
          <Button
            buttonColor="btn--white"
            buttonStyle="btn--lesspress"
            buttonSize="btn--medium"
            onClick={searchUser}
          >
            Search
          </Button>
        </div>
      </div>
    </>
  );
}

export default AddMember;
