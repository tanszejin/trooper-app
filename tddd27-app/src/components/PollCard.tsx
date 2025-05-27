import React, { useEffect, useState } from "react";
import "./PollCard.css";
import Card from "./Card";
import {
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

type pollObj = {
  id: string;
  created_at: Date;
  name: string;
  options: any[];
};

interface Props {
  poll: pollObj;
  pollsCollectionRef: any;
}

function PollCard({ poll, pollsCollectionRef }: Props) {
  const currentUser = auth.currentUser;
  // TODO: update ui according to below, implement voting
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState<any[]>(poll.options);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    if (!poll) {
      console.error("no poll provided");
      return;
    }
    checkVoted();

    // add listener
    const docRef = doc(pollsCollectionRef, poll.id);
    const unsubscribe = onSnapshot(docRef, getVotesFromSnapshot);
    return unsubscribe;
  }, []);

  async function checkVoted() {
    console.log("checkVoted function");
    try {
      const q = query(collection(db, "voted"), where("poll_id", "==", poll.id));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setVoted(false);
        return;
      }
      setTotalVotes(snapshot.docs.length);
      const votedList = snapshot.docs.map((doc) => doc.data().user_id);
      if (currentUser!.uid in votedList) {
        setVoted(true);
      } else {
        setVoted(false);
      }
    } catch (e) {
      console.error(e);
    }
  }

  function getVotesFromSnapshot(snapshot: DocumentSnapshot) {
    if (!snapshot.exists()) return;
    const data = snapshot.data().options;
    setVotes(data);
    let total = 0;
    votes.forEach((o) => (total += o.votes));
    setTotalVotes(total);
  }

  function getPercentage(idx: number) {
    const fraction = votes[idx].votes / totalVotes;
    console.log("percentage of votes for", votes[idx].content, ":", fraction);
    return fraction * 100;
  }

  return (
    <div>
      <Card className="poll-card" height={"100%"} width={"100%"} margin={0}>
        <h4>{poll.name}</h4>
        <ul className="poll-options-ul">
          {poll.options.map((option, idx) => (
            <li
              key={idx}
              className={`poll-option-li ${voted ? "voted" : "not-voted"}`}
            >
              {voted && (
                <div
                  className="percentage-bar"
                  style={{ width: `${voted ? getPercentage(idx) : 0}%` }}
                ></div>
              )}
              <p>{option.content}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export default PollCard;
