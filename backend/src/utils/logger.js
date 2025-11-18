const db = require("../../config/db");

exports.logAction = (userId, action) => {
  const sql = "INSERT INTO logs (user_id, action) VALUES (?, ?)";
  db.query(sql, [userId, action], (err) => {
    if (err) console.log("Log error:", err.message);
  });
};
