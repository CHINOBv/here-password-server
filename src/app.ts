import express from "express";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";

import userRoutes from "./routes/users.routes";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded());

//Routes

app.use(userRoutes);

export default app;
