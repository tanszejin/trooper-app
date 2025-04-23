import React, { useState } from "react";
import "./Day.css";
import Card from "./Card";
import DayEvent from "./DayEvent";
import Button from "./Button";

type Event = {
  name: string;
  time: string;
  // and more
};

type Day = {
  date: string;
  events: Event[];
};

interface Props {
  day: Day;
}

function Day({ day }: Props) {
  const [events, setEvents] = useState(day.events);

  function addNewEvent() {
    let newEvent = {
      name: "",
      time: "",
    };
    let updated = [...events, newEvent];
    setEvents(updated);
  }

  return (
    <>
      <Card className="day-card" height={"100%"} width={"100%"} margin={0}>
        <h4>{day.date}</h4>
        <ul>
          {events.map((evnt, idx) => (
            <li key={idx}>
              <DayEvent event={evnt}></DayEvent>
            </li>
          ))}
          <li key={-1}>
            <div className="add-btn-container">
              <Button
                onClick={addNewEvent}
                buttonStyle="btn--pressed--blue"
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

export default Day;
