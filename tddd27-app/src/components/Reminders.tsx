import React, { useEffect, useState } from "react";
import "./Reminders.css";
import Card from "./Card";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

interface Props {
  tripId: string;
}

function Reminders({ tripId }: Props) {
  const [reminders, setReminders] = useState<any[]>([]);
  const [newReminderContent, setNewReminderContent] = useState("");
  const remindersCollectionRef = collection(db, "trips", tripId, "reminders");

  useEffect(() => {
    if (!tripId) {
      console.error("no trip id provided");
      return;
    }
    getReminders();

    // add listener
    const q = query(remindersCollectionRef, orderBy("created_at", "asc"));
    const unsubscribe = onSnapshot(q, setRemindersFromSnapshot);
    return unsubscribe;
  }, []);

  async function getReminders() {
    console.log("getReminders function");
    try {
      const q = query(remindersCollectionRef, orderBy("created_at", "asc"));
      const snapshot = await getDocs(q);
      setRemindersFromSnapshot(snapshot);
    } catch (e) {
      console.error(e);
    }
  }

  function setRemindersFromSnapshot(snapshot: QuerySnapshot) {
    console.log("setRemindersFromSnapshot function");
    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setReminders(data);
  }

  async function deleteReminder(id: string) {
    console.log("deleting reminder");
    try {
      await deleteDoc(doc(remindersCollectionRef, id));
      console.log("reminder deleted");
    } catch (e) {
      console.error(e);
    }
  }

  async function addReminder() {
    if (newReminderContent === "") {
      return;
    }
    console.log("adding new reminder");
    const newReminder = {
      content: newReminderContent,
      created_at: serverTimestamp(),
    };
    setNewReminderContent("");
    try {
      await addDoc(remindersCollectionRef, newReminder);
      console.log("new reminder added");
    } catch (e) {
      console.error(e);
    }
  }

  function addReminderOnEnter(e: React.KeyboardEvent) {
    if (e.key === "Enter" && newReminderContent != "") {
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
            {reminders.map((reminder) => (
              <li key={reminder.id}>
                <span className={"reminder-text"}>{reminder.content}</span>
                <button
                  className="delete-reminder-btn"
                  onClick={() => deleteReminder(reminder.id)}
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
            value={newReminderContent}
            onChange={(e) => setNewReminderContent(e.target.value)}
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
