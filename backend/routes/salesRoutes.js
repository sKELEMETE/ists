const express = require("express");
const router = express.Router();
const { verifyRole } = require("../middleware/roleMiddleware");
const {
  recordSale,
  getSales,
  clearSales,
} = require("../controllers/salesController");
const { route } = require("./authRoutes");

// Record a sale, admin or cashier
router.post("/", verifyRole(["admin", "cashier"]), recordSale);

// Get all sales, admin only
router.get("/", verifyRole(["admin"]), getSales);

// Delete all sales, admin only
router.delete("/", verifyRole(["admin"]), clearSales);

module.exports = router;
