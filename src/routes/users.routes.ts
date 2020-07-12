import { Router } from "express";

const router = Router();

router.get("/signup", function (req, res) {
  res.send("Recived");
});
export default router;
