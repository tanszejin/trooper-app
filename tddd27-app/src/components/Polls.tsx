import React, { useEffect, useState } from "react";
import "./Polls.css";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import Card from "./Card";
import Button from "./Button";
import PollCard from "./PollCard";

interface Props {
  tripId: string;
}

function Polls({ tripId }: Props) {
  const [polls, setPolls] = useState<any[]>([]);
  const [showPollIdx, setShowPollIdx] = useState(-1);
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

  function addNewPoll() {}

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
                onClick={addNewPoll}
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
    </>
  );
}

export default Polls;
