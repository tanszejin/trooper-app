import React, { useState } from "react";
import "./DayEvent.css";
import { FaClock, FaMapMarkerAlt, FaUser } from "react-icons/fa";

type Event = {
  name: string;
  description: string;
  time: string;
  location: string;
  members: string;
};

interface Props {
  event: Event;
  onChange: (updatedPart: Partial<Event>) => void;
}

function DayEvent({ event, onChange }: Props) {
  // TODO: fix the textareas, dont allow multiple lines etc

  return (
    <div className="event-container">
      <div className="event-text-info-container">
        <textarea
          className="event-name"
          value={event.name}
          placeholder="event name..."
          onChange={(e) => onChange({name: e.target.value})} // update database too
          rows={2}
          maxLength={44}
        />
        <textarea
          className="event-description"
          value={event.description}
          placeholder="enter any descriptions or notes..."
          onChange={(e) => onChange({description: e.target.value})}
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
            value={event.time}
            onChange={(e) => onChange({time: e.target.value})}
          />
        </div>
        <div className="information-container">
          <FaMapMarkerAlt className="icon" />
          <textarea
            className="text"
            rows={1}
            placeholder="location..."
            value={event.location}
            onChange={(e) => onChange({location: e.target.value})}
          />
        </div>
        <div className="information-container">
          <FaUser className="icon" />
          <textarea
            className="text"
            rows={1}
            placeholder="members..."
            value={event.members}
            onChange={(e) => onChange({members: e.target.value})}
          />
        </div>
      </div>
    </div>
  );
}

export default DayEvent;
