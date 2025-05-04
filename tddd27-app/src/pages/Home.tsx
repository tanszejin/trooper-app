import React, { useState } from "react";
import NavBar from "../components/NavBar";
import "./Home.css";
import { useAuth } from "../contexts/authContext";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import CardDeck from "../components/CardDeck";

function Home() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const currentUser = auth.currentUser;

  const [showNavBar, setShowNavBar] = useState(true);

  function getUserTrips() {
    // TODO: babckend, clicking card, add new trip
    return [{
      name: "Scotland",
      imageUrl: "/images/example_1.jpg"
    },
    {
      name: "Austria",
      imageUrl: "/images/example_2.jpg"
    },
    {
      name: "Germany",
      imageUrl: "/images/example_3.jpg"
    },
    {
      name: "Italy",
      imageUrl: "/images/example_4.jpg"
    },
    {
      name: "Switzerland",
      imageUrl: "/images/example_5.jpg"
    },
    {
      name: "Spain",
      imageUrl: "/images/example_6.jpg"
    },
  ]
  }

  function handleCardDeckClick(idx: number) {

  }

  return (
    <>
    {!userLoggedIn && <Navigate to={"/hero"} replace={true} />}
      <div className="home-container">
        {showNavBar && <NavBar navbarColor="navbar--lightblue"/>}
        <h1>Welcome, {currentUser!=null ? currentUser.email : ""}</h1>
        <div className="carddeck-container">
          <CardDeck contents={getUserTrips()} onClick={(idx: number) => handleCardDeckClick(idx)}></CardDeck>
        </div>
      </div>
    </>
  );
}

export default Home;
