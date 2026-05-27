const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const leadRoutes = require("./routes/leadRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({ message: "API is running" });
});

app.use("/api/leads", leadRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
