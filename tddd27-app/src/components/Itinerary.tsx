import React, { useState } from "react";
import "./Itinerary.css";
import Card from "./Card";
import ItineraryDay from "./ItineraryDay";
import Button from "./Button";
import Day from "./Day";

// TODO: add day function, logic

function Itinerary() {
  function getItineraryDays() {
    // TODO: update function
    // gets the days in an itinerary, and the events and time for each day
    return [
      {
        date: "22 Apr",
        events: [
          {
            name: "first event",
            time: "10.00AM",
          },
          {
            name: "second event",
            time: "3.00PM",
          },
        ],
      },
      {
        date: "23 Apr",
        events: [
          {
            name: "first event on day two",
            time: "11.00AM",
          },
          {
            name: "second event on day two",
            time: "1.00PM",
          },
          {
            name: "third event on day two",
            time: "4.00PM",
          },
          {
            name: "fourth event on day two",
            time: "6.00PM",
          },
          {
            name: "fifth event on day two",
            time: "8.00PM",
          },
        ],
      },
      {
        date: "24 Apr",
        events: [
          {
            name: "first event on day three",
            time: "11.00AM",
          },
          {
            name: "second event on day three",
            time: "1.00PM",
          },
          {
            name: "third event on day three",
            time: "4.00PM",
          },
          {
            name: "fourth event on day three",
            time: "6.00PM",
          },
          {
            name: "fifth event on day three",
            time: "8.00PM",
          },
        ],
      },
      {
        date: "25 Apr",
        events: [
          {
            name: "first event on day four",
            time: "11.00AM",
          },
          {
            name: "second event on day four",
            time: "1.00PM",
          },
          {
            name: "third event on day four",
            time: "4.00PM",
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
            <Day day={days[showDayIdx]}></Day>
          </div>
        </>
      )}
    </>
  );
}

export default Itinerary;
