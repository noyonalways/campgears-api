import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import "colors";

// local imports
import rootRoutes from "./routes";
import config from "../config";

const app: Application = express();

// application middlewares
app.use(morgan(config.NODE_ENV === "development" ? "dev" : "tiny"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// application routes
app.use(rootRoutes);

export default app;
