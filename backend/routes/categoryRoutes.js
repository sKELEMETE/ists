const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  createCategory,
} = require("../controllers/categoryController");

const { verifyToken } = require("../middleware/roleMiddleware");

router.get("/", verifyToken, getAllCategories);
router.post("/", verifyToken, createCategory);

module.exports = router;
