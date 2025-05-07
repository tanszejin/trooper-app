import React, { useEffect, useState } from "react";
import "./ItineraryDay.css";
import {
  collection,
  CollectionReference,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { format } from "date-fns";

// just the card, uses props to get content
// props gives a day object

interface Props {
  daysCollectionRef: CollectionReference;
  day: any;
}

function ItineraryDay({ day, daysCollectionRef }: Props) {
  const [events, setEvents] = useState<any[]>([]);
  const eventsCollectionRef = collection(daysCollectionRef, day.id, "events");

  // add real-time updating?

  useEffect(() => {
    if (!day || !daysCollectionRef) {
      console.error("no day or days collection provided");
      return;
    }
    getEvents();
  }, []);

  async function getEvents() {
    try {
      const q = query(eventsCollectionRef, orderBy("time", "asc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEvents(data);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="itinerary-day-container">
      <h6>{format(day.date.toDate(), "dd MMM yyyy")}</h6>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <p className="event-name">{event.name}</p>
            <p className="event-time">
              {format(event.time.toDate(), "h.mm a")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItineraryDay;
