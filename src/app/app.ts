import "colors";
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
      "http://192.168.0.116:5173",
      "https://campgears.vercel.app",
      "https://campgears.noyonrahman.xyz",
    ],
  }),
);
app.use(express.json());

// application routes
app.use(rootRoutes);

export default app;
