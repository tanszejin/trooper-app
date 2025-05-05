import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "./Home.css";
import { useAuth } from "../contexts/authContext";
import { Navigate, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import CardDeck from "../components/CardDeck";
import {
  collection,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";

// TODO: babckend, clicking card, add new trip

function Home() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const currentUser = auth.currentUser;
  let userId = null;

  const [showNavBar, setShowNavBar] = useState(true);

  const [trips, setTrips] = useState<any>([]);

  useEffect(() => {
    getUserTrips();
  }, []);

  // EDITING
  async function getUserTrips() {
    try {
      const qTripId = query(
        collection(db, "trip-users"),
        where("user_id", "==", currentUser?.uid)
      );
      const snapshot = await getDocs(qTripId);
      const tripIds = snapshot.docs.map((doc) => doc.data().trip_id);
      console.log("trip_ids: ", tripIds);

      const qTrips = query(
        collection(db, "trips"),
        where("__name__", "in", tripIds)
      );
      const snapsho = await getDocs(qTrips);
      const tripData = snapsho.docs.map((doc) => ({
        trip_name: doc.data().trip_name,
        image_url: doc.data().image_url,
        id: doc.id,
      }));
      console.log("trips: ", tripData);
      setTrips(tripData);
    } catch (e) {
      console.error(e);
    }
    //   return [{
    //     name: "Scotland",
    //     imageUrl: "/images/example_1.jpg"
    //   },
    //   {
    //     name: "Austria",
    //     imageUrl: "/images/example_2.jpg"
    //   },
    //   {
    //     name: "Germany",
    //     imageUrl: "/images/example_3.jpg"
    //   },
    //   {
    //     name: "Italy",
    //     imageUrl: "/images/example_4.jpg"
    //   },
    //   {
    //     name: "Switzerland",
    //     imageUrl: "/images/example_5.jpg"
    //   },
    //   {
    //     name: "Spain",
    //     imageUrl: "/images/example_6.jpg"
    //   },
    // ]
  }

  function handleCardDeckClick(idx: number) {
    const tripId = trips[idx].id;
    navigate("/trips/" + tripId);
  }

  return (
    <>
      {!userLoggedIn && <Navigate to={"/hero"} replace={true} />}
      <div className="home-container">
        {showNavBar && <NavBar navbarColor="navbar--lightblue" />}
        <h1>Welcome, {currentUser != null ? currentUser.email : ""}</h1>
        <div className="carddeck-container">
          <CardDeck
            contents={trips}
            onClick={(idx: number) => handleCardDeckClick(idx)}
          ></CardDeck>
        </div>
      </div>
    </>
  );
}

export default Home;
