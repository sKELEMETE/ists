const db = require("../config/db");
const { logAction } = require("../src/utils/logger");

exports.getProducts = (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.addProduct = (req, res) => {
  const { name, price, stock } = req.body;
  const sql = "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)";
  db.query(sql, [name, price, stock], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Product added", id: result.insertId });
  });
  logAction(req.user.id, `Added product ${name}`);
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;

  const sql = "UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?";
  db.query(sql, [name, price, stock, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Product updated" });
  });
  logAction(req.user.id, `Updated product ID ${id}`);
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM products WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Product deleted" });
  });
  logAction(req.user.id, `Deleted product ID ${id}`);
};
