import { Router } from "express";

import { signUp, signIn } from "../controllers/user.controller";
import passport from "passport";

import { schemas, validateBody } from "../helpers/routesHelper";

const router = Router();

router.post("/signup", signUp);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signIn
);

export default router;
