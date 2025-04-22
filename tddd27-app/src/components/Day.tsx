import React from "react";
import "./Day.css";
import Card from "./Card";
import DayEvent from "./DayEvent";

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
  return (
    <>
      <Card className="day-card" height={"100%"} width={"100%"} margin={0}>
        <h4>{day.date}</h4>
        <ul>
            {day.events.map((evnt, idx) => (
                <li key={idx}>
                    <DayEvent event={evnt}></DayEvent>
                </li>
            ))}
            // TODO: function to add new event
        </ul>
      </Card>
    </>
  );
}

export default Day;
