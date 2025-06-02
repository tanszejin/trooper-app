import React, { useEffect, useState } from "react";
import "./AddMember.css";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

function AddMember() {
  const { tripId } = useParams();
  const [email, setEmail] = useState("");
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [currentMembers, setCurrentMembers] = useState<any[]>([]);
  const tripUsersCollectionRef = collection(db, "trip-users");

  useEffect(() => {
    if (!tripId) {
      console.error("no trip id provided");
      return;
    }
    getCurrentMembers();

    // add listener
    const q = query(tripUsersCollectionRef);
    const unsubscribe = onSnapshot(q, setCurrentMembersFromSnapshot);
    return unsubscribe;
  }, []);

  async function getCurrentMembers() {
    console.log("getCurrentMembers function");
    try {
      const q = query(tripUsersCollectionRef, where("trip_id", "==", tripId));
      const snapshot = await getDocs(q);
      const userIds = snapshot.docs.map((doc) => doc.data().user_id);
      const qMembers = query(
        collection(db, "users"),
        where("user_id", "in", userIds)
      );
      const snapshotMembers = await getDocs(qMembers);
      setCurrentMembersFromSnapshot(snapshotMembers);
    } catch (e) {
      console.error(e);
    }
  }

  function setCurrentMembersFromSnapshot(snapshot: QuerySnapshot) {
    if (snapshot.empty) return;
    console.log("setCurrentMembersFromSnapshot function");
    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(data);
    setCurrentMembers(data);
  }

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
      const filtered = data.filter(
        (u) => !currentMembers.map((m) => m.id).includes(u.id)
      );
      console.log(data);
      console.log(filtered);
      setSearchResult(filtered);
    } catch (e) {
      console.error("Error searching for user:", e);
      return;
    }
  }

  async function addUserToTrip(user: any) {
    console.log("addUserToTrip function");
    try {
      const newTripUser = {
        trip_id: tripId,
        user_id: user.id,
      };
      await addDoc(tripUsersCollectionRef, newTripUser);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <NavBar navbarColor="navbar--blue"></NavBar>
      <div className="current-members-container">
        <h3>Current members</h3>
        <ul className="current-members-ul">
          {currentMembers.map((member) => (
            <li key={member.id} className="current-member-listitem">
              <div className="current-member-info">
                <div className="current-member-name">
                  <span className="current-member-firstname">
                    {member.first_name}
                  </span>
                  <span className="current-membert-lastname">
                    {member.last_name}
                  </span>
                </div>
                <span className="current-member-email">{member.email}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
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
                  addUserToTrip(user);
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
