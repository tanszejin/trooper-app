import React, { useState } from "react";
import "./DayEvent.css";
import { FaClock, FaMapMarkerAlt, FaUser } from "react-icons/fa";

type Event = {
  name: string;
  time: string;
  // and more
};

interface Props {
  event: Event;
}

function DayEvent({ event }: Props) {
  // TODO: implement a way to edit these, need to be updated to database
  const [eventName, setEventName] = useState(event.name);
  const [eventTime, setEventTime] = useState(event.time);
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventMembers, setEventMembers] = useState("");

  return (
    <div className="event-container">
      <div className="event-text-info-container">
        <textarea
          className="event-name"
          value={eventName}
          placeholder="event name..."
          onChange={(e) => setEventName(e.target.value)} // update database too
          rows={2}
          maxLength={44}
        />
        <textarea
          className="event-description"
          value={eventDescription}
          placeholder="enter any descriptions or notes..."
          onChange={(e) => setEventDescription(e.target.value)}
          rows={4}
          maxLength={400}
        />
      </div>
      <div className="event-other-info-container">
        <div className="information-container">
          <FaClock className="icon" />
          <textarea
            className="text"
            rows={1}
            placeholder="time..."
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
          />
        </div>
        <div className="information-container">
          <FaMapMarkerAlt className="icon" />
          <textarea
            className="text"
            rows={1}
            placeholder="location..."
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
          />
        </div>
        <div className="information-container">
          <FaUser className="icon" />
          <textarea
            className="text"
            rows={1}
            placeholder="members..."
            value={eventMembers}
            onChange={(e) => setEventMembers(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default DayEvent;
