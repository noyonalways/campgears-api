import "colors";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";

// local imports
import config from "../config";
import rootRoutes from "./routes";

const app: Application = express();

// application middlewares
app.use(morgan(config.NODE_ENV === "development" ? "dev" : "tiny"));
app.use(helmet());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://192.168.0.116:5173",
      "http://192.168.0.116:3000",
      "https://campgears.vercel.app",
      "https://campgears.noyonrahman.xyz",
      "https://admin-campgears.vercel.app",
      "https://admin-campgears.noyonrahman.xyz",
    ],
  }),
);
app.use(express.json());
app.use(cookieParser());

// application routes
app.use(rootRoutes);

export default app;
