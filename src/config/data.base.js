import mongoose from "mongoose";
import config from "./config.js";

export const connectToDB = async () => {
  if (config.mode === "test") {
    console.log("[DB] Skipping connection in test mode");
    return;
  }

  try {
    await mongoose.connect(config.mongo_uri);
    console.info(`[DB] Connected to MongoDB`);
  } catch (error) {
    console.error(`[DB] Connection failed: ${error.message}`);
    throw new Error(`MongoDB connection error: ${error.message}`);
  }
};
