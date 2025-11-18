const db = require("../config/db");
const { logAction } = require("../src/utils/logger");

exports.recordSale = (req, res) => {
  const { product_id, quantity } = req.body;
  const userId = req.user.id; // from JWT

  // Check stock
  db.query(
    "SELECT stock, price FROM products WHERE id = ?",
    [product_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ error: "Product not found" });

      const product = results[0];
      if (product.stock < quantity)
        return res.status(400).json({ error: "Not enough stock" });

      const totalPrice = product.price * quantity;

      // Insert sale
      db.query(
        "INSERT INTO sales (product_id, quantity, total_price, sold_by) VALUES (?, ?, ?, ?)",
        [product_id, quantity, totalPrice, userId],
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });

          // Update product stock
          db.query(
            "UPDATE products SET stock = stock - ? WHERE id = ?",
            [quantity, product_id],
            (err) => {
              if (err) return res.status(500).json({ error: err.message });
              res.json({
                message: "Sale recorded successfully",
                saleId: result.insertId,
              });
            }
          );
        }
      );
      logAction(userId, `Sold product ${product_id} qty ${quantity}`);
    }
  );
};

exports.getSales = (req, res) => {
  db.query(
    `SELECT s.id, p.name AS product, s.quantity, s.total_price, u.fullname AS sold_by, s.created_at
         FROM sales s
         JOIN products p ON s.product_id = p.id
         JOIN users u ON s.sold_by = u.id
         ORDER BY s.created_at DESC`,
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

exports.clearSales = (req, res) => {
  db.query("DELETE FROM sales", (err) => {
    if (err) {
      return res.status(500).json({ error: "Server error" });
    }
    res.json({ message: "Sales cleared" });
  });
};
