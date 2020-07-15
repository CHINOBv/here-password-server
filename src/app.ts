import express from "express";
import session from "express-session";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/users.routes";
import passportMiddleware from "./middlewares/passport";
import specialRoutes from "./routes/special.routes";

const secretSession = process.env.SESSION_SECRET;

const app = express();

//MiddleWares
app.use(cors());
app.use(morgan("dev"));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
passport.use(passportMiddleware);
app.use(
  session({
    secret: `${secretSession}`,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());
//Routes

app.use(userRoutes);
app.use(specialRoutes);

export default app;
