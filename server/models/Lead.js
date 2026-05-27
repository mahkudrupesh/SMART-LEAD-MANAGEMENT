const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ["New", "Contacted", "In Progress", "Closed"],
    default: "New"
  },
  assignedTo: {
    type: String,
    default: "Unassigned",
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Lead", leadSchema);
