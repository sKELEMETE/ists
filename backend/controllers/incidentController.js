const db = require("../config/db");
const { logAction } = require("../src/utils/logger");

// Get all incidents
exports.getAllIncidents = (req, res) => {
  db.query(
    "SELECT * FROM incidents ORDER BY date_reported DESC",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

// Get incident by ID
exports.getIncidentById = (req, res) => {
  db.query(
    "SELECT * FROM incidents WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results[0] || null);
    }
  );
};

// Add new incident
exports.addIncident = (req, res) => {
  const { title, description, reported_by } = req.body;

  db.query(
    "INSERT INTO incidents (title, description, reported_by) VALUES (?, ?, ?)",
    [title, description, reported_by],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      logAction(reported_by, `Reported incident: ${title}`);
      res.json({
        id: result.insertId,
        title,
        description,
        reported_by,
        status: "open",
      });
    }
  );
};

// Update incident
exports.updateIncident = (req, res) => {
  const { title, description, status } = req.body;

  db.query(
    "UPDATE incidents SET title = ?, description = ?, status = ? WHERE id = ?",
    [title, description, status, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });

      logAction(req.user.id, `Updated incident ID: ${req.params.id}`);
      res.json({ message: "Updated successfully" });
    }
  );
};

// Delete incident
exports.deleteIncident = (req, res) => {
  db.query("DELETE FROM incidents WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    logAction(req.user.id, `Deleted incident ID: ${req.params.id}`);
    res.json({ message: "Deleted successfully" });
  });
};
