const express = require("express");
const router = express.Router();
const { verifyRole } = require("../middleware/roleMiddleware");
const { getLogs } = require("../controllers/logsController");

// Admin only
router.get("/", verifyRole(["admin"]), getLogs);

module.exports = router;
