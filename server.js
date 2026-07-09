// ============================================================
//  server.js — Desk Sign Backend
//  - GET  /api/screen   → returns current message as JSON
//  - POST /api/screen   → updates the message
//  - GET  /             → serves the dashboard HTML
// ============================================================

const express = require("express");
const cors    = require("cors");
const app     = express();
const PORT    = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));  // serves dashboard from /public folder

// In-memory store (persists as long as server is running)
let message = {
  name:      "Your Name",
  title:     "Your Title",
  status:    "Away from Desk",
  backAt:    "",
  phone:     "",
  email:     "",
  slack:     "",
  note:      "",
  updatedAt: new Date().toISOString()
};

// ESP32 polls this — returns current message as JSON
app.get("/api/screen", (req, res) => {
  res.json(message);
});

// Dashboard posts to this to update the message
app.post("/api/screen", (req, res) => {
  const { name, title, status, backAt, phone, email, slack, note } = req.body;
  message = {
    name:      name      ?? message.name,
    title:     title     ?? message.title,
    status:    status    ?? message.status,
    backAt:    backAt    ?? message.backAt,
    phone:     phone     ?? message.phone,
    email:     email     ?? message.email,
    slack:     slack     ?? message.slack,
    note:      note      ?? message.note,
    updatedAt: new Date().toISOString()
  };
  console.log("Message updated:", message);
  res.json({ ok: true, message });
});

app.listen(PORT, () => {
  console.log(`Desk Sign server running on port ${PORT}`);
});