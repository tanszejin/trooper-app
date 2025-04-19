import React from "react";
import NavBar from "../components/NavBar";
import "./Trip.css";

function Trip() {
  return (
    <>
      <NavBar />
      <div className="trip-container">
        <h3 className="trip-name">Trip name</h3>
      </div>
    </>
  );
}

export default Trip;
