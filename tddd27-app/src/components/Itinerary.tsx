import React, { useState } from "react";
import "./Itinerary.css";
import Card from "./Card";
import ItineraryDay from "./ItineraryDay";
import Button from "./Button";
import DayCard from "./DayCard";

// TODO: add day function, logic
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


function Itinerary() {
  function getItineraryDays(): Day[] {
    // TODO: update function
    // gets the days in an itinerary, and the events and time for each day
    return [
      {
        date: "22 Apr",
        events: [
          {
            name: "first event",
            description: "",
            time: "10.00AM",
            location: "",
            members: ""
          },
          {
            name: "second event",
            description: "",
            time: "3.00PM",
            location: "",
            members: ""
          },
        ],
      },
      {
        date: "23 Apr",
        events: [
          {
            name: "first event on day two",
            description: "",
            time: "11.00AM",
            location: "",
            members: ""
          },
          {
            name: "second event on day two",
            description: "",
            time: "1.00PM",
            location: "",
            members: ""
          },
          {
            name: "third event on day two",
            description: "",
            time: "4.00PM",
            location: "",
            members: ""
          },
          {
            name: "fourth event on day two",
            description: "",
            time: "6.00PM",
            location: "",
            members: ""
          },
          {
            name: "fifth event on day two",
            description: "",
            time: "8.00PM",
            location: "",
            members: ""
          },
        ],
      },
      {
        date: "24 Apr",
        events: [
          {
            name: "first event on day three",
            description: "",
            time: "11.00AM",
            location: "",
            members: ""
          },
          {
            name: "second event on day three",
            description: "",
            time: "1.00PM",
            location: "",
            members: ""
          },
          {
            name: "third event on day three",
            description: "",
            time: "4.00PM",
            location: "",
            members: ""
          },
          {
            name: "fourth event on day three",
            description: "",
            time: "6.00PM",
            location: "",
            members: ""
          },
          {
            name: "fifth event on day three",
            description: "",
            time: "8.00PM",
            location: "",
            members: ""
          },
        ],
      },
      {
        date: "25 Apr",
        events: [
          {
            name: "first event on day four",
            description: "",
            time: "11.00AM",
            location: "",
            members: ""
          },
          {
            name: "second event on day four",
            description: "",
            time: "1.00PM",
            location: "",
            members: ""
          },
          {
            name: "third event on day four",
            description: "",
            time: "4.00PM",
            location: "",
            members: ""
          },
        ],
      },
    ];
  }

  const [days, setDays] = useState(getItineraryDays());
  const [newDay, setNewDay] = useState({});
  const [showDayIdx, setShowDayIdx] = useState(-1); // the idx of the day in days

  function addNewDay() {}

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
            <li key={idx} onClick={() => setShowDayIdx(idx)}>
              <ItineraryDay day={day}></ItineraryDay>
            </li>
          ))}
          <li key={-1}>
            <div className="add-btn-container">
              <Button
                onClick={addNewDay}
                buttonStyle="btn--pressed--blue"
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
            <DayCard day={days[showDayIdx]}></DayCard>
          </div>
        </>
      )}
    </>
  );
}

export default Itinerary;
