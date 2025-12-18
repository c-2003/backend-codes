import db from "../config/Database.con.js";

const User = {
  create: (userData, callback) => {
    const sql = "INSERT INTO users SET ?";
    db.query(sql, userData, callback);
  },

  findByEmail: (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], callback);
  },

  updateStatus: (userId, status, callback) => {
    const sql = "UPDATE users SET online_status = ? WHERE id = ?";
    db.query(sql, [status, userId], callback);
  },
};

export default User;
