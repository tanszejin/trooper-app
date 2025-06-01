import React, { useState } from "react";
import "./AddMember.css";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

function AddMember() {
  const { tripId } = useParams();
  const [email, setEmail] = useState("");
  const [searchResult, setSearchResult] = useState<any[]>([]);

  async function searchUser() {
    if (email.trim() === "") {
      return;
    }
    try {
      const q = query(collection(db, "users"), where("email", "==", email));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        console.log("No user found with that email.");
        setSearchResult([]);
        return;
      }
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSearchResult(data);
    } catch (e) {
      console.error("Error searching for user:", e);
      return;
    }
  }

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <ul className="search-result-ul">
          {searchResult.map((user) => (
            <li key={user.id} className="search-result-listitem">
              <div className="search-result-info">
                <div className="search-result-name">
                  <span className="search-result-firstname">
                    {user.first_name}
                  </span>
                  <span className="search-result-lastname">
                    {user.last_name}
                  </span>
                </div>
                <span className="search-result-email">{user.email}</span>
              </div>
              <Button
                buttonColor="btn--white"
                buttonStyle="btn--lesspress"
                buttonSize="btn--small"
                onClick={() => {
                  // Logic to add user to trip goes here
                  console.log(`Adding ${user.email} to trip ${tripId}`);
                }}
              >
                Add to Trip
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default AddMember;
