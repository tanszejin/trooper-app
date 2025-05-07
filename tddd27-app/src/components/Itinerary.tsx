import React, { useEffect, useState } from "react";
import "./Itinerary.css";
import Card from "./Card";
import ItineraryDay from "./ItineraryDay";
import Button from "./Button";
import DayCard from "./DayCard";
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

// TODO: add day function, logic
type Event = {
  name: string;
  description: string;
  time: string;
  location: string;
  members: string;
};

interface Props {
  tripId: string;
}

function Itinerary({ tripId }: Props) {
  const [days, setDays] = useState<any[]>([]);
  const [showDayIdx, setShowDayIdx] = useState(-1); // the idx of the day in days
  const daysCollectionRef = collection(db, "trips", tripId, "days");

  useEffect(() => {
    if (!tripId) {
      console.error("no trip id provided");
      return;
    }
    getDays();

    // add listener
    const q = query(daysCollectionRef, orderBy("date", "asc"));
    const unsubscribe = onSnapshot(q, setDaysFromSnapshot);
    return unsubscribe;
  }, []);

  async function getDays() {
    // TODO: update function
    // gets the days in an itinerary, and the events and time for each day
    // gets directly from backend
    console.log("getDays function");
    try {
      const q = query(daysCollectionRef, orderBy("date", "asc"));
      const snapshot = await getDocs(q);
      setDaysFromSnapshot(snapshot);
    } catch (e) {
      console.error(e);
    }
  }

  function setDaysFromSnapshot(snapshot: QuerySnapshot) {
    console.log("setDaysFromSnapshot function");
    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setDays(data);
  }

  async function addNewDay() {
    console.log("adding new day");
    try {
      // if no days yet then put current date first
      // TODO: ui for editing date
      const theNextDay =
        days.length === 0
          ? serverTimestamp()
          : new Date(
              days[days.length - 1].date.toDate().getTime() +
                24 * 60 * 60 * 1000
            );
      const newDay = {
        date: theNextDay,
      };
      const dayRef = await addDoc(daysCollectionRef, newDay);
      console.log("new day added");
      const newEmptyEvent = {
        name: "new event",
        description: "",
        time: serverTimestamp(),
        location: "",
        members: [],
      };
      await addDoc(
        collection(daysCollectionRef, dayRef.id, "events"),
        newEmptyEvent
      );
      console.log("empty event added");
      getDays();
    } catch (e) {
      console.error(e);
    }
  }

  // function updateDays(idx: number, updatedPart: Partial<Day>) {
  //   let newDays = [...days];
  //   newDays[idx] = { ...newDays[idx], ...updatedPart };
  //   setDays(newDays);
  // }

  return (
    <>
      <Card
        className="trip-itinerary-card"
        width="64%"
        margin="0"
        backgroundColor="#e1f0fc"
      >
        <h5 className="trip-card-name">Itinerary</h5>
        <ul className="itinerary-days-ul">
          {days.map((day, idx) => (
            <li key={day.id} onClick={() => setShowDayIdx(idx)}>
              <ItineraryDay day={day} daysCollectionRef={daysCollectionRef}></ItineraryDay>
            </li>
          ))}
          <li key={-1}>
            <div className="add-btn-container">
              <Button
                onClick={addNewDay}
                buttonColor="btn--blue"
                buttonStyle="btn--mediumpress"
                buttonSize="btn--large"
              >
                +
              </Button>
            </div>
          </li>
        </ul>
      </Card>
      {showDayIdx > -1 && (
        <>
          <div className="backdrop" onClick={() => setShowDayIdx(-1)}></div>
          <div className="day-container">
            <DayCard day={days[showDayIdx]} daysCollectionRef={daysCollectionRef}></DayCard>
          </div>
        </>
      )}
    </>
  );
}

export default Itinerary;

// [
//   {
//     date: "22 Apr",
//     events: [
//       {
//         id: crypto.randomUUID(),
//         name: "first event",
//         description: "",
//         time: "10.00AM",
//         location: "",
//         members: "",
//       },
//       {
//         id: crypto.randomUUID(),
//         name: "second event",
//         description: "",
//         time: "3.00PM",
//         location: "",
//         members: "",
//       },
//     ],
//   },
//   {
//     date: "23 Apr",
//     events: [
//       {
//         id: crypto.randomUUID(),
//         name: "first event on day two",
//         description: "",
//         time: "11.00AM",
//         location: "",
//         members: "",
//       },
//       {
//         id: crypto.randomUUID(),
//         name: "second event on day two",
//         description: "",
//         time: "1.00PM",
//         location: "",
//         members: "",
//       },
//       {
//         id: crypto.randomUUID(),
//         name: "third event on day two",
//         description: "",
//         time: "4.00PM",
//         location: "",
//         members: "",
//       },
//       {
//         id: crypto.randomUUID(),
//         name: "fourth event on day two",
//         description: "",
//         time: "6.00PM",
//         location: "",
//         members: "",
//       },
//       {
//         id: crypto.randomUUID(),
//         name: "fifth event on day two",
//         description: "",
//         time: "8.00PM",
//         location: "",
//         members: "",
//       },
//     ],
//   },
//   {
//     date: "24 Apr",
//     events: [
//       {
//         id: crypto.randomUUID(),
//         name: "first event on day three",
//         description: "",
//         time: "11.00AM",
//         location: "",
//         members: "",
//       },
//       {
//         id: crypto.randomUUID(),
//         name: "second event on day three",
//         description: "",
//         time: "1.00PM",
//         location: "",
//         members: "",
//       },
//       {
//         id: crypto.randomUUID(),
//         name: "third event on day three",
//         description: "",
//         time: "4.00PM",
//         location: "",
//         members: "",
//       },
//       {
//         id: crypto.randomUUID(),
//         name: "fourth event on day three",
//         description: "",
//         time: "6.00PM",
//         location: "",
//         members: "",
//       },
//       {
//         id: crypto.randomUUID(),
//         name: "fifth event on day three",
//         description: "",
//         time: "8.00PM",
//         location: "",
//         members: "",
//       },
//     ],
//   },
//   {
//     date: "25 Apr",
//     events: [
//       {
//         id: crypto.randomUUID(),
//         name: "first event on day four",
//         description: "",
//         time: "11.00AM",
//         location: "",
//         members: "",
//       },
//       {
//         id: crypto.randomUUID(),
//         name: "second event on day four",
//         description: "",
//         time: "1.00PM",
//         location: "",
//         members: "",
//       },
//       {
//         id: crypto.randomUUID(),
//         name: "third event on day four",
//         description: "",
//         time: "4.00PM",
//         location: "",
//         members: "",
//       },
//     ],
//   },
// ];
