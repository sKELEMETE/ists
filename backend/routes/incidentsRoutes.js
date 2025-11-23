const express = require("express");
const router = express.Router();
const incidentsController = require("../controllers/incidentController");
const { verifyRole } = require("../middleware/roleMiddleware");

router.get("/", incidentsController.getAllIncidents);
router.get("/:id", incidentsController.getIncidentById);
router.post("/", incidentsController.addIncident);
router.put("/:id", incidentsController.updateIncident);
router.delete("/:id", incidentsController.deleteIncident);

module.exports = router;
