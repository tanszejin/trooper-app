import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "./Home.css";
import { useAuth } from "../contexts/authContext";
import { Navigate, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import CardDeck from "../components/CardDeck";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import Button from "../components/Button";

// TODO: babckend, clicking card, add new trip

function Home() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const currentUser = auth.currentUser;

  const [showNavBar, setShowNavBar] = useState(true);
  const [addingNewTrip, setAddingNewTrip] = useState(false);
  const [newTripName, setNewTripName] = useState("");

  const [tripIds, setTripIds] = useState<string[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    getUserTrips();
  }, []);

  async function getUserTrips() {
    try {
      const qTripId = query(
        collection(db, "trip-users"),
        where("user_id", "==", currentUser!.uid)
      );
      const snapshot = await getDocs(qTripId);
      if (snapshot.empty) return;

      const data = snapshot.docs.map((doc) => doc.data().trip_id);
      console.log("trip_ids: ", data);
      setTripIds(data)      
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
    const tripId = tripIds[idx];
    navigate("/trip/" + tripId);
  }

  async function addTrip() {
    console.log("adding new trip");
    const newTrip = {
      created_by: currentUser!.uid,
      image_url: "/images/example_2.jpg",
      trip_name: newTripName,
    };
    try {
      const tripRef = await addDoc(collection(db, "trips"), newTrip);
      console.log("new trip added");
      const newTripUser = {
        trip_id: tripRef.id,
        user_id: currentUser!.uid,
      };
      await addDoc(collection(db, "trip-users"), newTripUser);
      setAddingNewTrip(false);
      navigate("/trip/" + tripRef.id);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      {!userLoggedIn && <Navigate to={"/hero"} replace={true} />}
      <div className="home-container">
        {showNavBar && <NavBar navbarColor="navbar--lightblue" />}
        <h1>Welcome, {currentUser != null ? currentUser.email : ""}</h1>
        {tripIds.length > 0 && <div className="carddeck-container">
          <CardDeck
            tripIds={tripIds}
            onClick={(idx: number) => handleCardDeckClick(idx)}
          ></CardDeck>
        </div>}
        <div className="add-new-trip-button">
          <Button
            buttonColor="btn--clear"
            buttonStyle="btn--morepress"
            buttonSize="btn--large"
            onClick={() => setAddingNewTrip(true)}
          >
            Add a new trip
          </Button>
        </div>
      </div>
      {addingNewTrip && (
        <>
          <div
            className="backdrop"
            onClick={() => setAddingNewTrip(false)}
          ></div>
          <div className="set-tripname-container">
            <input
              className="set-tripname-input"
              type="text"
              placeholder="Enter your trip name..."
              value={newTripName}
              onChange={(e) => setNewTripName(e.target.value)}
            />
            <div className="add-btn-container">
              <Button
                buttonColor="btn--blue"
                buttonStyle="btn--mediumpress"
                buttonSize="btn--medium"
                onClick={addTrip}
              >
                Add
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
