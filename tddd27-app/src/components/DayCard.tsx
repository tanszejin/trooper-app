import React, { useEffect, useState } from "react";
import "./DayCard.css";
import Card from "./Card";
import DayEvent from "./DayEvent";
import Button from "./Button";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  updateDoc,
} from "firebase/firestore";
import { format } from "date-fns";

interface Props {
  day: any;
  daysCollectionRef: CollectionReference;
}

function DayCard({ day, daysCollectionRef }: Props) {
  const [date, setDate] = useState(format(day.date.toDate(), "dd MMM yyyy"));
  const [events, setEvents] = useState<any[]>([]);
  const eventsCollectionRef = collection(daysCollectionRef, day.id, "events");

  useEffect(() => {
    if (!day || !daysCollectionRef) {
      console.error("no day or days collection provided");
      return;
    }
    getEvents();

    const q = query(eventsCollectionRef, orderBy("time", "asc"));
    const unsubscribe = onSnapshot(q, setEventsFromSnapshot);
    return unsubscribe;
  }, []);

  async function getEvents() {
    console.log("setEvents function");
    try {
      const q = query(eventsCollectionRef, orderBy("time", "asc"));
      const snapshot = await getDocs(q);
      setEventsFromSnapshot(snapshot);
    } catch (e) {
      console.error(e);
    }
  }

  function setEventsFromSnapshot(snapshot: QuerySnapshot) {
    if (snapshot.empty) return;
    console.log("setEventsFromSnapshot function");
    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setEvents(data);
  }

  async function addNewEvent() {
    console.log("adding new event");
    let newEvent = {
      name: "",
      description: "",
      time: new Date(day.date.toDate().getTime() + 23 * 60 * 60 * 1000),
      location: "",
      members: [],
    };
    try {
      await addDoc(eventsCollectionRef, newEvent);
      console.log("new event added");
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteEvent(id: string) {
    console.log("deleting event");
    try {
      await deleteDoc(doc(eventsCollectionRef, id));
      console.log("event deleted");
    } catch (e) {
      console.error(e);
    }
  }

  async function swapTimes(a: number, b: number) {
    try {
      await Promise.all([
        updateDoc(doc(eventsCollectionRef, events[a].id), {
          time: events[b].time,
        }),
        updateDoc(doc(eventsCollectionRef, events[b].id), {
          time: events[a].time,
        }),
      ]);
      console.log("updated event times");
    } catch (e) {
      console.error(e);
    }
  }

  function moveEventUp(idx: number) {
    if (idx === 0) {
      return;
    }
    swapTimes(idx - 1, idx);
  }

  function moveEventDown(idx: number) {
    if (idx === events.length - 1) {
      return;
    }
    swapTimes(idx, idx + 1);
  }

  async function updateDate() {
    console.log("updating date");
    try {
      await updateDoc(doc(daysCollectionRef, day.id), {
        date: date
      })
      console.log("updated date")
    } catch (e) {
      console.error(e)
    }
  }

  async function updateEvent(id: string, updatedPart: Partial<any>) {
    // updatedPart can be an object with some (or all) of the fields of Event
    console.log("updating event");
    try {
      await updateDoc(doc(eventsCollectionRef, id), updatedPart);
      console.log("updated event");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <Card className="day-card" height={"100%"} width={"100%"} margin={0}>
        // make a custom datepicker??
        <input
          className="date-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onBlur={updateDate}
        />
        <ul>
          {events.map((evnt, idx) => (
            <li key={evnt.id}>
              <DayEvent
                event={evnt}
                onChange={(updatedPart) => updateEvent(evnt.id, updatedPart)}
              ></DayEvent>
              <div className="btn-container">
                <button
                  className="delete-event-btn"
                  onClick={() => deleteEvent(evnt.id)}
                >
                  <span>✚</span>
                </button>
                {/* <button
                  className="move-event-btn"
                  onClick={() => moveEventUp(idx)}
                >
                  <span>
                    <FaArrowUp className="icon" />
                  </span>
                </button>
                <button
                  className="move-event-btn"
                  onClick={() => moveEventDown(idx)}
                >
                  <span>
                    <FaArrowDown className="icon" />
                  </span>
                </button> */}
              </div>
            </li>
          ))}
          <li key={"add-btn"}>
            <div className="add-btn-container">
              <Button
                onClick={addNewEvent}
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
    </>
  );
}

export default DayCard;
