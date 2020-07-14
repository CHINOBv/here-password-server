import express, { Router, Request, Response } from "express";
import passport, { session } from "passport";
const app = express();
const router = Router();

app.get(
  "/special",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response) => {
    res.send("Success");
  }
);

router.get("/special/info", (req: Request, res: Response) => {
  res.send("Entry");
});

export default router;
