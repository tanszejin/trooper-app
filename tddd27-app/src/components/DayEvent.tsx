import React, { useState } from "react";
import "./DayEvent.css";
import { FaClock, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { format, parse } from "date-fns";

interface Props {
  event: any;
  onChange: (updatedPart: Partial<any>) => void;
}

function DayEvent({ event, onChange }: Props) {
  // TODO: fix the textareas, dont allow multiple lines etc
  const date = format(event.time.toDate(), "yyyy-MM-dd");
  const [name, setName] = useState(event.name);
  const [description, setDescription] = useState(event.description);
  const [time, setTime] = useState(format(event.time.toDate(), "h.mm a"));
  const [location, setLocation] = useState(event.location);
  const [members, setMembers] = useState(event.members);

  function parseTime(str: string) {
    // TODO: more input handling
    return parse(`${date} ${str}`, "yyyy-MM-dd h.mm a", new Date())
  }

  return (
    <div className="event-container">
      <div className="event-text-info-container">
        <textarea
          className="event-name"
          value={name}
          placeholder="event name..."
          onChange={(e) => {setName(e.target.value)}}
          onBlur={(e) => onChange({ name: e.target.value })} // update database too
          rows={2}
          maxLength={44}
        />
        <textarea
          className="event-description"
          value={description}
          placeholder="enter any descriptions or notes..."
          onChange={(e) => {setDescription(e.target.value)}}
          onBlur={(e) => onChange({ description: e.target.value })}
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
            value={time}
            onChange={(e) => {setTime(e.target.value)}}
            onBlur={(e) =>
              onChange({ time: parseTime(e.target.value) })
            }
          />
        </div>
        <div className="information-container">
          <FaMapMarkerAlt className="icon" />
          <textarea
            className="text"
            rows={1}
            placeholder="location..."
            value={location}
            onChange={(e) => {setLocation(e.target.value)}}
            onBlur={(e) => onChange({ location: e.target.value })}
          />
        </div>
        <div className="information-container">
          <FaUser className="icon" />
          <textarea
            className="text"
            rows={1}
            placeholder="members..."
            value={members.join(", ")}
            onChange={(e) => {setMembers(e.target.value.split(", "))}}
            onBlur={(e) => onChange({ members: e.target.value.split(", ") })}
          />
        </div>
      </div>
    </div>
  );
}

export default DayEvent;
