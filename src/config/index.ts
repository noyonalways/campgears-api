import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  APP_NAME: process.env.APP_NAME,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  CLIENT_BASE_URL: process.env.CLIENT_BASE_URL,
  API_BASE_URL: process.env.API_BASE_URL,
  SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD,

  // jwt configuration
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_EXPIRES_IN: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,

  // rest password token
  JWT_RESET_PASSWORD_SECRET: process.env.JWT_RESET_PASSWORD_SECRET,
  JWT_RESET_PASSWORD_EXPIRES_IN: process.env.JWT_RESET_PASSWORD_EXPIRES_IN,
  RESET_PASSWORD_UI_URL: process.env.RESET_PASSWORD_UI_URL,

  // bcrypt configuration
  BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND,
};
