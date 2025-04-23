import React, { useState } from "react";
import "./DayCard.css";
import Card from "./Card";
import DayEvent from "./DayEvent";
import Button from "./Button";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

type Event = {
  name: string;
  description: string;
  time: string;
  location: string;
  members: string;
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
    // change to backend function
    let newEvent = {
        name: "",
        description: "",
        time: "",
        location: "",
        members: ""
    };
    let updated = [...events, newEvent];
    setEvents(updated);
  }

  function deleteEvent(idx: number) {
    console.log("delete event", idx);
    let updated = [...events];
    updated.splice(idx, 1);
    setEvents(updated);
    console.log("new events array: ", updated);
  }

  function moveEventUp(idx: number) {
    if (idx === 0) {
      return;
    }
    let updated = [...events];
    updated.splice(idx - 1, 2, events[idx], events[idx - 1]);
    setEvents(updated);
  }

  function moveEventDown(idx: number) {
    if (idx === events.length - 1) {
      return;
    }
    let updated = [...events];
    updated.splice(idx, 2, events[idx + 1], events[idx]);
    setEvents(updated);
  }

  function updateEvent(idx: number, updatedPart: Partial<Event>) {
    // updatedPart can be an object with some (or all) of the fields of Event
    const newEvents = [...events];
    newEvents[idx] = { ...newEvents[idx], ...updatedPart };
    setEvents(newEvents);
  }

  return (
    <>
      <Card className="day-card" height={"100%"} width={"100%"} margin={0}>
        <h4>{day.date}</h4>
        <ul>
          {events.map((evnt, idx) => (
            <li key={idx}>
              <DayEvent
                event={evnt}
                onChange={(updatedPart) => updateEvent(idx, updatedPart)}
              ></DayEvent>
              <div className="btn-container">
                <button
                  className="delete-event-btn"
                  onClick={() => deleteEvent(idx)}
                >
                  <span>✚</span>
                </button>
                <button
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
                </button>
              </div>
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
