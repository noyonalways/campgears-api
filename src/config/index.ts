import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  strip_secret_key: process.env.STRIPE_SECRET_KEY,
  client_base_url: process.env.CLIENT_BASE_URL,
};
