const express = require("express");
const { pool } = require("../config/postgres");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ status: "ok" });
});

router.get("/db", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    const mongoState = mongoose.connection.readyState === 1;

    res.json({
      postgres: "ok",
      mongo: mongoState ? "ok" : "disconnected"
    });
  } catch {
    res.status(500).json({ status: "db error" });
  }
});

module.exports = router;
