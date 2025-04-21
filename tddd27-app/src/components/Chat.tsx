import React, { useState } from "react";
import "./Chat.css";
import Card from "./Card";
import Button from "./Button";

function Chat() {
  // maintain the current user
  const current_user = "currentuser";

  function getChatMessages() {
    // TODO: update function
    return [
      {
        sender: "user1",
        text: "first dummy message",
      },
      {
        sender: "currentuser",
        text: "i send dummy message",
      },
      {
        sender: "user2",
        text: " very very very very very very very very very very very very very very very very very very very very very very long another dummy message sent after the first",
      },
    ];
  }

  const [messages, setMessages] = useState(getChatMessages());
  const [newMessage, setNewMessage] = useState("");

  function sendNewMessage() {
    if (newMessage === "") {
      return;
    }
    let updated = [...messages, { sender: current_user, text: newMessage }];
    setMessages(updated);
    setNewMessage("");
  }

  function sendNewMessageOnEnter(e: React.KeyboardEvent) {
    if (e.key === "Enter" && newMessage != "") {
      sendNewMessage();
    }
  }

  return (
    <>
      <Card className="trip-smaller-card" width="64%" margin="0">
        <h5 className="trip-card-name">Chat</h5>
        <div className="chat-container">
          <ul>
            {messages.map((message, idx) => (
              <li
                key={idx}
                className={`message-listitem ${
                  message.sender === current_user ? "from-user" : ""
                }`}
              >
                {message.sender != current_user && (
                  <span className="message-sender-text">{message.sender}</span>
                )}
                <span className="message-text">{message.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="send-message-container">
          <textarea
            className="send-message-textarea"
            placeholder="type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyUp={sendNewMessageOnEnter}
            wrap="soft"
            rows={1}
          />
          <div className="send-btn-container">
            <Button
              onClick={sendNewMessage}
              buttonStyle="btn--pressed--blue"
              buttonSize="btn--small"
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
