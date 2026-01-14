const db = require("../config/db");
const { logAction } = require("../src/utils/logger");

// Get all products with category names
exports.getProducts = (req, res) => {
  const sql = `
    SELECT p.*, c.name AS category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Add new product
exports.addProduct = (req, res) => {
  const { name, price, stock, category_id } = req.body;
  const sql =
    "INSERT INTO products (name, price, stock, category_id) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, price, stock, category_id || null], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    logAction(req.user.id, `Added product ${name}`);
    res.status(201).json({ message: "Product added", id: result.insertId });
  });
};

// Update existing product
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, stock, category_id } = req.body;

  const sql =
    "UPDATE products SET name = ?, price = ?, stock = ?, category_id = ? WHERE id = ?";
  db.query(sql, [name, price, stock, category_id || null, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    logAction(req.user.id, `Updated product ID ${id}`);
    res.json({ message: "Product updated" });
  });
};

// Delete product
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM products WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    logAction(req.user.id, `Deleted product ID ${id}`);
    res.json({ message: "Product deleted" });
  });
};
