import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "./Trip.css";
import Card from "../components/Card";
import Tasks from "../components/Tasks";
import Reminders from "../components/Reminders";
import Chat from "../components/Chat";
import Itinerary from "../components/Itinerary";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Polls from "../components/Polls";

// TODO: add trip members function

function Trip() {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const [trip, setTrip] = useState<any>(null);

  useEffect(() => {
    if (!tripId) {
      console.error("no trip id in url");
      navigate("/home");
    }
    console.log("showing trip: ", tripId);
    getTripData();
  }, []);

  async function getTripData() {
    try {
      const snapshot = await getDoc(doc(db, "trips", tripId!));
      if (!snapshot.exists()) {
        throw new Error("trip does not exist");
      }
      setTrip(snapshot.data());
    } catch (e) {
      console.error(e);
      setTrip(null);
      navigate("/home");
    }
  }

  async function handleRemindersUpdate(newReminders: string[]) {
    console.log("updating reminders");
    try {
      await updateDoc(doc(db, "trips", tripId!), {
        reminders: newReminders,
      });
      console.log("updated reminders");
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  if (trip)
    return (
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
            <Itinerary tripId={tripId!}></Itinerary>
          </div>
          <div className="trip-cards-container">
            <Tasks tripId={tripId!}></Tasks>
            <Reminders tripId={tripId!}></Reminders>
          </div>
          <div className="trip-cards-container">
            <Chat tripId={tripId!}></Chat>
            <Polls tripId={tripId!}></Polls>
          </div>
        </div>
      </>
    );
}

export default Trip;
