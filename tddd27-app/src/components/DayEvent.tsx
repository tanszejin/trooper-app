import React, { useState } from "react";
import "./DayEvent.css";
import { FaClock, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { format } from "date-fns";

interface Props {
  event: any;
  onChange: (updatedPart: Partial<any>) => void;
}

function DayEvent({ event, onChange }: Props) {
  // TODO: fix the textareas, dont allow multiple lines etc

  const date = format(event.time.toDate(), "yyyy-mm-dd")

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
            value={format(event.time.toDate(), "h.mm a")}
            onChange={(e) => onChange({time: new Date(`${date} ${e.target.value}`)})}
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
