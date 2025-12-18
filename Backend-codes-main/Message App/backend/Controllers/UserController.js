import Message from "../models/Message.js";

export const sendMessage = (req, res) => {
  const { senderId, receiverId, message_text } = req.body;
  const newMessage = {
    sender_id: senderId,
    receiver_id: receiverId,
    message_text,
  };

  Message.create(newMessage, (err, result) => {
    if (err) return res.status(500).json({ msg: "Error sending message" });
    res.json({ msg: "Message sent successfully" });
  });
};

export const getMessages = (req, res) => {
  const { senderId, receiverId } = req.params;

  Message.getByUserIds(senderId, receiverId, (err, messages) => {
    if (err) return res.status(500).json({ msg: "Error fetching messages" });
    res.json(messages);
  });
};
