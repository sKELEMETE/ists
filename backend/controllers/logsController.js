const db = require("../config/db");

exports.getLogs = (req, res) => {
  const sql = `
        SELECT l.id, u.fullname AS user, l.action, l.created_at
        FROM logs l
        LEFT JOIN users u ON l.user_id = u.id
        ORDER BY l.created_at DESC
    `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
