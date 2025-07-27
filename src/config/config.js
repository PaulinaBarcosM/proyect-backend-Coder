import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const env = process.env.NODE_ENV || "dev";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let envPath;
if (env === "test") {
  envPath = path.resolve(__dirname, "../../.env.test");
} else if (env === "prod") {
  envPath = path.resolve(__dirname, "../../.env.prod");
} else {
  envPath = path.resolve(__dirname, "../../.env");
}

dotenv.config({ path: envPath });

const config = {
  port: process.env.PORT || 8080,
  mode: env,
  mongo_uri: process.env.MONGO_URI,
  secret_key: process.env.SECRET_KEY || "default_secret",
};

export default config;
export { __dirname };
