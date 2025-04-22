import React from "react";
import "./ItineraryDay.css";

// just the card, uses props to get content
// props gives a day object

type Event = {
  name: string;
  time: string;
};

type Day = {
  date: string;
  events: Event[];
};

interface Props {
  day: Day;
}

function ItineraryDay({ day }: Props) {
  return (
    <div className="itinerary-day-container">
      <h6>{day.date}</h6>
      <ul>
        {day.events.map((event, idx) => (
            <li key={idx}>
                <p className="event-name">{event.name}</p>
                <p className="event-time">{event.time}</p>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default ItineraryDay;
