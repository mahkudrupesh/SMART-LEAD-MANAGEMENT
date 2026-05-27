const axios = require("axios");
const Lead = require("../models/Lead");

const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL || "http://localhost:5678/webhook/create-lead";

const createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);

    try {
      await axios.post(N8N_WEBHOOK_URL, req.body);
    } catch (webhookErr) {
      console.error("n8n webhook error:", webhookErr.message);
    }

    return res.status(201).json({
      message: "Lead created successfully",
      lead
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to create lead",
      error: err.message
    });
  }
};

const getLeads = async (_req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    return res.status(200).json(leads);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch leads",
      error: err.message
    });
  }
};

const updateLead = async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    return res.status(200).json({
      message: "Lead updated successfully",
      lead: updatedLead
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to update lead",
      error: err.message
    });
  }
};

const deleteLead = async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);

    if (!deletedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    return res.status(200).json({ message: "Lead deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to delete lead",
      error: err.message
    });
  }
};

module.exports = {
  createLead,
  getLeads,
  updateLead,
  deleteLead
};
