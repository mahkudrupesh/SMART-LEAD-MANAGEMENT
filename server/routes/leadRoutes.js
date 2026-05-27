const express = require("express");
const {
  createLead,
  getLeads,
  updateLead,
  deleteLead
} = require("../controllers/leadController");

const router = express.Router();

router.post("/create", createLead);
router.get("/", getLeads);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

module.exports = router;
