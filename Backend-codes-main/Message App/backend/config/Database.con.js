import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yourpassword",
  database: "messaging_app",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});

export default db;
