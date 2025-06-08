import React, { useEffect, useState } from "react";
import "./Polls.css";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import Card from "./Card";
import Button from "./Button";
import PollCard from "./PollCard";
import { set } from "date-fns";

interface Props {
  tripId: string;
}

function Polls({ tripId }: Props) {
  const [polls, setPolls] = useState<any[]>([]);
  const [showPollIdx, setShowPollIdx] = useState(-1);
  const [addingNewPoll, setAddingNewPoll] = useState(false);
  const [newPollName, setNewPollName] = useState("");
  const [newPollOptions, setNewPollOptions] = useState<any[]>([]);
  const pollsCollectionRef = collection(db, "trips", tripId, "polls");

  useEffect(() => {
    if (!tripId) {
      console.error("no trip id provided");
      return;
    }
    getPolls();

    // add listener
    const q = query(pollsCollectionRef, orderBy("created_at", "asc"));
    const unsubscribe = onSnapshot(q, setPollsFromSnapshot);
    return unsubscribe;
  }, []);

  async function getPolls() {
    console.log("getDays function");
    try {
      const q = query(pollsCollectionRef, orderBy("created_at", "asc"));
      const snapshot = await getDocs(q);
      setPollsFromSnapshot(snapshot);
    } catch (e) {
      console.error(e);
    }
  }

  function setPollsFromSnapshot(snapshot: QuerySnapshot) {
    if (snapshot.empty) return;
    console.log("setDaysFromSnapshot function");
    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setPolls(data);
  }

  async function addNewPoll() {
    console.log("addNewPoll function");
    const newPoll = {
      created_at: serverTimestamp(),
      name: newPollName,
      options: newPollOptions.map((opt) => ({
        content: opt.trim(),
        votes: 0,
      })),
    };
    setNewPollName("");
    setNewPollOptions([]);

    try {
      await addDoc(pollsCollectionRef, newPoll);
      console.log("new poll added");
    } catch (e) {
      console.error(e);
    }

    setAddingNewPoll(false);
  }

  return (
    <>
      <Card
        className="trip-polls-card"
        width={"32%"}
        margin={0}
        backgroundColor="#70b9ef"
      >
        <h5 className="trip-card-name">Polls</h5>
        <ul className="polls-ul">
          {polls.map((poll, idx) => (
            <li key={poll.id} onClick={() => setShowPollIdx(idx)}>
              <h6>{poll.name}</h6>
            </li>
          ))}
          <li key={-1}>
            <div className="add-btn-container">
              <Button
                onClick={() => setAddingNewPoll(true)}
                buttonColor="btn--white"
                buttonStyle="btn--mediumpress"
                buttonSize="btn--large"
              >
                +
              </Button>
            </div>
          </li>
        </ul>
      </Card>
      {showPollIdx > -1 && (
        <>
          <div className="backdrop" onClick={() => setShowPollIdx(-1)}></div>
          <div className="poll-container">
            <PollCard
              poll={polls[showPollIdx]}
              pollsCollectionRef={pollsCollectionRef}
            ></PollCard>
          </div>
        </>
      )}
      {addingNewPoll && (
        <>
          <div
            className="backdrop"
            onClick={() => setAddingNewPoll(false)}
          ></div>
          <div className="set-newpoll-container">
            <div className="set-pollname-container">
              <h5>Poll name:</h5>
              <input
                className="set-pollname-input"
                type="text"
                placeholder="Enter your poll name..."
                value={newPollName}
                onChange={(e) => setNewPollName(e.target.value)}
              />
            </div>
            <div className="set-options-container">
              <h5>Options:</h5>
              <textarea
                className="set-options-textarea"
                placeholder="Enter options separated by commas..."
                value={newPollOptions.join(",")}
                onChange={(e) => setNewPollOptions(e.target.value.split(","))}
              />
            </div>
            <div className="add-btn-container">
              <Button
                buttonColor="btn--blue"
                buttonStyle="btn--mediumpress"
                buttonSize="btn--medium"
                onClick={addNewPoll}
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

export default Polls;
