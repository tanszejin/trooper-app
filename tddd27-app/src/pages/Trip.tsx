import React from "react";
import NavBar from "../components/NavBar";
import "./Trip.css";
import Card from "../components/Card";

function Trip() {
  return (
    <>
      <NavBar />
      <div className="trip-container">
        <h3 className="trip-name">Trip name</h3>
        <div className="trip-cards-container">
          <Card
            className="trip-image-card"
            height="20rem"
            width="32%"
            margin="0 10px 0 0"
            padding={0}
          >
            <img className="trip-image" src="images/default.jpg" alt="image" />
          </Card>
          <Card className="trip-itinerary-card" width="64%" margin="0 0 0 10px">
            <h5 className="trip-card-name">Itinerary</h5>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Trip;
