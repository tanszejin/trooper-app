import { useEffect, useState } from "react";
import "./PollCard.css";
import Card from "./Card";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentSnapshot,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import Button from "./Button";
// import { set } from "date-fns";

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
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState<any[]>(poll.options);
  const [totalVotes, setTotalVotes] = useState(0);
  const [votedDoc, setVotedDoc] = useState<any>(null);
  const [rendered, setRendered] = useState(false);
  const votedCollectionRef = collection(db, "voted");

  useEffect(() => {
    if (!poll) {
      console.error("no poll provided");
      return;
    }
    checkVoted();
    getTotalVotes();

    // add listener
    const docRef = doc(pollsCollectionRef, poll.id);
    const unsubscribe = onSnapshot(docRef, getVotesFromSnapshot);
    return unsubscribe;
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRendered(true);
    }, 50); // short delay to allow mount and CSS transition
    return () => clearTimeout(timeout);
  }, []);

  async function checkVoted() {
    console.log("checkVoted function");
    setVoted(false);
    try {
      const q = query(votedCollectionRef, where("poll_id", "==", poll.id));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setVoted(false);
        return;
      }

      const data = snapshot.docs.map((doc) => ({
        user_id: doc.data().user_id,
        option_idx: doc.data().option_idx,
        id: doc.id,
      }));
      const found = data.find((d) => d.user_id === currentUser!.uid);
      if (found) {
        setVoted(true);
        setVotedDoc(found);
        console.log(
          "User has already voted for option index:",
          found.option_idx
        );
      } else {
        setVoted(false);
      }
    } catch (e) {
      console.error(e);
    }
  }

  function getTotalVotes() {
    let total = 0;
    votes.forEach((o: { votes: number }) => (total += o.votes));
    setTotalVotes(total);
  }

  function getVotesFromSnapshot(snapshot: DocumentSnapshot) {
    if (!snapshot.exists()) return;
    const data = snapshot.data().options;
    setVotes(data);
    let total = 0;
    data.forEach((o: { votes: number }) => (total += o.votes));
    setTotalVotes(total);
  }

  function getPercentage(idx: number) {
    const fraction = votes[idx].votes / totalVotes;
    console.log("percentage of votes for", votes[idx].content, ":", fraction);
    return fraction * 100;
  }

  async function castVote(idx: number) {
    if (voted) {
      console.log("Already voted");
      return;
    }
    // update votes
    const updatedVotes = [...votes];
    updatedVotes[idx].votes += 1;
    setVoted(true);

    // update firestore
    try {
      await updateDoc(doc(pollsCollectionRef, poll.id), {
        options: updatedVotes,
      });
      console.log("Vote cast successfully");
      const docRef = await addDoc(votedCollectionRef, {
        poll_id: poll.id,
        user_id: currentUser!.uid,
        option_idx: idx,
      });
      const newVotedDoc = {
        poll_id: poll.id,
        user_id: currentUser!.uid,
        option_idx: idx,
        id: docRef.id,
      };
      setVotedDoc(newVotedDoc);
      console.log("Vote recorded in voted collection");
    } catch (e) {
      console.error("Error casting vote:", e);
    }
  }

  async function retractVote() {
    if (!voted || votedDoc === null) {
      console.log("not voted yet");
      return;
    }
    // update votes
    const updatedVotes = [...votes];
    updatedVotes[votedDoc.option_idx].votes -= 1;

    // update firestore
    try {
      await Promise.all([
        updateDoc(doc(pollsCollectionRef, poll.id), {
          options: updatedVotes,
        }),
        deleteDoc(doc(votedCollectionRef, votedDoc.id)),
      ]);
      console.log("Vote retracted successfully");
      setVoted(false);
      setVotedDoc(null);
    } catch (e) {
      console.error("Error retracting vote:", e);
    }
  }

  return (
    <div>
      <Card className="poll-card" height={"100%"} width={"100%"} margin={0}>
        <h4>{poll.name}</h4>
        <ul className="poll-options-ul">
          {votes.map((option, idx) => (
            <li
              key={idx}
              className={`poll-option-li ${voted ? "voted" : "not-voted"} ${
                votedDoc && votedDoc.option_idx === idx ? "voted-this" : ""
              }`}
              onClick={(_) => castVote(idx)}
            >
              <div
                className="percentage-bar"
                style={{
                  width: `${rendered && voted ? getPercentage(idx) : 0}%`,
                }}
              ></div>
              <p>{option.content}</p>
            </li>
          ))}
        </ul>
        {voted && (
          <div className="button-container">
            <Button
              buttonColor="btn--blue"
              buttonStyle="btn--lesspress"
              buttonSize="btn--small"
              onClick={retractVote}
            >
              Retract vote
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

export default PollCard;
