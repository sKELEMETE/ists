const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { logAction } = require("../src/utils/logger");

// Register a new user
const registerUser = (req, res) => {
  const { fullname, email, password, role } = req.body;

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 8);

  const sql =
    "INSERT INTO users (fullname, email, password, role) VALUES (?, ?, ?, ?)";
  db.query(
    sql,
    [fullname, email, hashedPassword, role || "cashier"],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: "User registered successfully",
        userId: result.insertId,
      });
      logAction(result.insertId, "User registered");
    }
  );
};

// Login user
const loginUser = (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ error: "User not found" });

    const user = results[0];

    // Check password
    const passwordIsValid = require("bcryptjs").compareSync(
      password,
      user.password
    );
    if (!passwordIsValid)
      return res.status(401).json({ error: "Invalid password" });

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.fullname },
      "your_secret_key",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.fullname,
        email: user.email,
        role: user.role,
      },
    });
    logAction(user.id, "User logged in");
  });
};

module.exports = { registerUser, loginUser };
