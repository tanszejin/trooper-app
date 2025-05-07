import React, { useEffect, useState } from "react";
import "./Chat.css";
import Card from "./Card";
import Button from "./Button";
import { auth, db } from "../firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

interface Props {
  tripId: string; // change reminders to do this too for real-time syncing
}

function Chat({ tripId }: Props) {
  // this is still the user object
  const currentUser = auth.currentUser!;
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessageContent, setNewMessageContent] = useState("");
  const chatCollectionRef = collection(db, "trips", tripId, "chat");

  useEffect(() => {
    if (!tripId) {
      console.error("no trip id provided");
      return;
    }
    getChatMessages();

    // add listener for real-time updates
    const q = query(chatCollectionRef, orderBy("sent_at", "asc"));
    const unsubscribe = onSnapshot(q, setChatMessagesFromSnapshot);
    return unsubscribe;
  }, []);

  async function getChatMessages() {
    console.log("getChatMEssages function");
    try {
      const q = query(chatCollectionRef, orderBy("sent_at", "asc"));
      const snapshot = await getDocs(q);
      setChatMessagesFromSnapshot(snapshot);
    } catch (e) {
      console.error(e);
    }
  }

  function setChatMessagesFromSnapshot(snapshot: QuerySnapshot) {
    console.log("getChatMessagesFromSnapshot function");
    const chatData = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setMessages(chatData);
  }

  async function getUserFirstname() {
    // ideally should maintain a current user object with the names?
    console.log("getUserFirstname function");
    try {
      const snapshot = await getDoc(doc(db, "users", currentUser.uid));
      if (snapshot.exists()) {
        console.log("user first name: ", snapshot.data().first_name);
        return snapshot.data().first_name;
      } else throw new Error("user not found");
    } catch (e) {
      console.error(e);
      return "undefined user";
    }
  }

  async function sendNewMessage() {
    if (newMessageContent === "") {
      return;
    }
    console.log("sending new message");
    const newMessage = {
      content: newMessageContent,
      sender_uid: currentUser.uid,
      sender_firstname: await getUserFirstname(),
      sent_at: serverTimestamp(),
    };
    try {
      await addDoc(chatCollectionRef, newMessage);
      console.log("message sent");
      setNewMessageContent("");
      // changes to chat collection should be automatically updated cus of the listener
    } catch (e) {
      console.error(e);
    }
  }

  function sendNewMessageOnEnter(e: React.KeyboardEvent) {
    if (e.key === "Enter" && newMessageContent != "") {
      sendNewMessage();
    }
  }

  return (
    <>
      <Card className="trip-smaller-card" width="64%" margin="0">
        <h5 className="trip-card-name">Chat</h5>
        <div className="chat-container">
          <ul>
            {messages.map((message) => (
              <li
                key={message.id}
                className={`message-listitem ${
                  message.sender_uid === currentUser.uid ? "from-user" : ""
                }`}
              >
                {message.sender_uid != currentUser.uid && (
                  <span className="message-sender-text">
                    {message.sender_firstname}
                  </span>
                )}
                <span className="message-text">{message.content}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="send-message-container">
          <textarea
            className="send-message-textarea"
            placeholder="type a message..."
            value={newMessageContent}
            onChange={(e) => setNewMessageContent(e.target.value)}
            onKeyUp={sendNewMessageOnEnter}
            wrap="soft"
            rows={1}
          />
          <div className="send-btn-container">
            <Button
              onClick={sendNewMessage}
              buttonColor="btn--blue"
              buttonStyle="btn--mediumpress"
              buttonSize="btn--medium"
            >
              send
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}

export default Chat;
