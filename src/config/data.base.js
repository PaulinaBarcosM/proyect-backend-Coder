import mongoose from "mongoose";
import config from "./config.js";

export const connectToDB = async () => {
  if (config.mode === "test") {
    console.log("[DB] Omitir conexión en modo de prueba");
    return;
  }

  try {
    await mongoose.connect(config.mongo_uri);
    console.info(`[DB] MongoDB Conectado`);
  } catch (error) {
    console.error(`[DB] Conexión fallida: ${error.message}`);
    throw new Error(`Erro de conexión de MongoDB: ${error.message}`);
  }
};
