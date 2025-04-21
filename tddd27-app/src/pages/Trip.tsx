import React from "react";
import NavBar from "../components/NavBar";
import "./Trip.css";
import Card from "../components/Card";
import Tasks from "../components/Tasks";

function Trip() {
  return (
    <>
      <NavBar />
      <div className="trip-container">
        <h3 className="trip-name">Trip name</h3>
        <div className="trip-cards-container">
          <Card
            className="trip-image-card"
            height="24rem"
            width="32%"
            margin="0"
            padding={0}
          >
            <img className="trip-image" src="images/example.jpg" alt="image" />
          </Card>
          <Card className="trip-itinerary-card" width="64%" margin="0">
            <h5 className="trip-card-name">Itinerary</h5>
          </Card>
        </div>
        <div className="trip-cards-container">
          <Tasks></Tasks>
          <Card className="trip-smaller-card" width="48%" margin="0">
            <h5 className="trip-card-name">Reminders</h5>
          </Card>
        </div>
        <div className="trip-cards-container">
          <Card className="trip-smaller-card" width="64%" margin="0">
            <h5 className="trip-card-name">Chat</h5>
          </Card>
          <Card className="trip-smaller-card" width="32%" margin="0">
            <h5 className="trip-card-name">Polls</h5>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Trip;
