const db = require("../config/db");
const { logAction } = require("../src/utils/logger");

// Get all categories
exports.getAllCategories = (req, res) => {
  db.query("SELECT * FROM categories ORDER BY name ASC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    logAction(req.user?.id || "system", "Fetched all categories");
    res.json(results);
  });
};

// Get category by ID
exports.getCategoryById = (req, res) => {
  db.query(
    "SELECT * FROM categories WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      logAction(
        req.user?.id || "system",
        `Fetched category ID: ${req.params.id}`
      );
      res.json(results[0] || null);
    }
  );
};

// Add new category
exports.createCategory = (req, res) => {
  const { name } = req.body;
  db.query(
    "INSERT INTO categories (name) VALUES (?)",
    [name],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      logAction(req.user?.id || "system", `Added category: ${name}`);
      res.json({ id: result.insertId, name });
    }
  );
};

// Update category
exports.updateCategory = (req, res) => {
  const { name } = req.body;
  db.query(
    "UPDATE categories SET name = ? WHERE id = ?",
    [name, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });

      logAction(
        req.user?.id || "system",
        `Updated category ID: ${req.params.id} to name: ${name}`
      );
      res.json({ message: "Category updated successfully" });
    }
  );
};

// Delete category
exports.deleteCategory = (req, res) => {
  db.query("DELETE FROM categories WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    logAction(
      req.user?.id || "system",
      `Deleted category ID: ${req.params.id}`
    );
    res.json({ message: "Category deleted successfully" });
  });
};
