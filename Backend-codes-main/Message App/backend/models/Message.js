import db from "../config/db.js";

const Message = {
  create: (messageData, callback) => {
    const sql = "INSERT INTO messages SET ?";
    db.query(sql, messageData, callback);
  },

  getByUserIds: (senderId, receiverId, callback) => {
    const sql = `
      SELECT * FROM messages 
      WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)
      ORDER BY created_at ASC
    `;
    db.query(sql, [senderId, receiverId, receiverId, senderId], callback);
  },
};

export default Message;
