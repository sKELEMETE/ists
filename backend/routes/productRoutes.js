const express = require("express");
const router = express.Router();
const { verifyRole } = require("../middleware/roleMiddleware");
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// View products, both admin and cashier
router.get("/", verifyRole(["admin", "cashier"]), getProducts);

// Add product, admin only
router.post("/", verifyRole(["admin"]), addProduct);

// Update product, admin only
router.put("/:id", verifyRole(["admin"]), updateProduct);

// Delete product, admin only
router.delete("/:id", verifyRole(["admin"]), deleteProduct);

module.exports = router;
