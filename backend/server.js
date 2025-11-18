const express = require("express"); // Import Express framework
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const { verifyToken } = require("./middleware/roleMiddleware");
const productRoutes = require("./routes/productRoutes");
const salesRoutes = require("./routes/salesRoutes");
const logsRoutes = require("./routes/logsRoutes");

const app = express(); // Create Express app instance

// Middleware to parse JSON request bodies
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running"); // Send response
});

//Dashboard Route
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "OK",
    user: req.user,
  });
});

// Start server on port 5000
const PORT = process.env.PORT || 5000;
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/logs", logsRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
