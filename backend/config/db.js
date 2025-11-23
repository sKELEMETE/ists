const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "ists",
});

db.query("SELECT 1", (err, results) => {
  if (err) {
    console.log("DB connection failed");
    return;
  }
  console.log("DB connected");
});

module.exports = db;
