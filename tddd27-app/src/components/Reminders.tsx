import React, { useState } from "react";
import "./Reminders.css";
import Card from "./Card";

interface Props {
  content: string[];
  onUpdate: (newReminders: string[]) => Promise<boolean>;
}

function Reminders({ content, onUpdate }: Props) {
  const [reminders, setReminders] = useState<string[]>(content);
  const [newReminder, setNewReminder] = useState("");

  async function deleteReminder(idx: number) {
    let updated = [...reminders];
    updated.splice(idx, 1);
    const success = await onUpdate(updated);
    if (success) setReminders(updated);
  }

  async function addReminder() {
    if (newReminder === "") {
      return;
    }
    let updated = [...reminders, newReminder];
    const success = await onUpdate(updated);
    if (success) setReminders(updated);
    setNewReminder("");
  }

  function addReminderOnEnter(e: React.KeyboardEvent) {
    if (e.key === "Enter" && newReminder != "") {
      addReminder();
    }
  }

  return (
    <>
      <Card
        className="trip-smaller-card"
        width="48%"
        margin="0"
        padding="1.5rem 0.3rem"
      >
        <h5 className="trip-card-name">Reminders</h5>
        <div className="reminders-list-container">
          <ul>
            {reminders.map((reminder, idx) => (
              <li key={idx}>
                <span className={"reminder-text"}>{reminder}</span>
                <button
                  className="delete-reminder-btn"
                  onClick={() => deleteReminder(idx)}
                >
                  <span>✚</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="new-reminder-container">
          <textarea
            className="new-reminder-textarea"
            placeholder="new reminder"
            value={newReminder}
            onChange={(e) => setNewReminder(e.target.value)}
            onBlur={addReminder}
            onKeyUp={addReminderOnEnter}
            maxLength={100}
            wrap="soft"
            rows={1}
          />
        </div>
      </Card>
    </>
  );
}

export default Reminders;
