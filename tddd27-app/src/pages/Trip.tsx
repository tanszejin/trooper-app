import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "./Trip.css";
import Card from "../components/Card";
import Tasks from "../components/Tasks";
import Reminders from "../components/Reminders";
import Chat from "../components/Chat";
import Itinerary from "../components/Itinerary";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";


function Trip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<any>(null);

  useEffect(() => {
    console.log("showing trip: ", tripId);
    getTripData();
  }, []);

  async function getTripData() {
    try {
      if (!tripId) {
        throw new Error("no trip id in url");
      }
      const snapshot = await getDoc(doc(db, "trips", tripId));
      if (!snapshot.exists()) {
        throw new Error("trip does not exist");
      }
      setTrip(snapshot.data());
    } catch (e) {
      console.error(e);
      setTrip(null);
    }
  }

  if (trip) return (
    <>
      <NavBar navbarColor="navbar--blue" />
      <div className="trip-container">
        <h3 className="trip-name">{trip.trip_name}</h3>
        <div className="trip-cards-container">
          <Card
            className="trip-image-card"
            height="24rem"
            width="32%"
            margin="0"
            padding={0}
          >
            <img className="trip-image" src={trip.image_url} alt="image" />
          </Card>
          <Itinerary></Itinerary>
        </div>
        <div className="trip-cards-container">
          <Tasks tripId={tripId!}></Tasks>
          <Reminders></Reminders>
        </div>
        <div className="trip-cards-container">
          <Chat></Chat>
          <Card className="trip-smaller-card" width="32%" margin="0">
            <h5 className="trip-card-name">Polls</h5>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Trip;
