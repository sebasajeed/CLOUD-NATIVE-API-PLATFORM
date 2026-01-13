const mongoose = require("mongoose");
const { mongoUri } = require("./env");

async function connectMongo() {
  try {
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
    process.exit(1);
  }
}

module.exports = connectMongo;
