import app from "./app.express.js";
import { connectToDB } from "./config/data.base.js";
import config from "./config/config.js";

const startServer = async () => {
  if (config.mode === "test") {
    console.info("Skiping server start in test mode");
    return null;
  }

  try {
    await connectToDB();
    app.listen(config.port, () => {
      console.info(`Servidor corriendo en puerto ${config.port}`);
    });
  } catch (error) {
    console.error(`Server failed to start: ${error.message}`);
  }
};

export default startServer;
