import React, { useState, useEffect } from "react";
import axios from "axios";

const Message = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("/api/users/messages/1/2") // Replace senderId and receiverId as needed
      .then((response) => setMessages(response.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSendMessage = () => {
    axios
      .post("/api/users/message", {
        senderId: 1,
        receiverId: 2,
        message_text: message,
      }) // Replace senderId and receiverId
      .then(() => {
        setMessages([...messages, { message_text: message }]);
        setMessage("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Messages</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg.message_text}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Message;
