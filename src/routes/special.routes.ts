import express, { Router, Request, Response } from "express";
import passport, { session } from "passport";
const app = express();
const router = Router();

import Account, { IAccount } from "../models/accounts.model";
import User from "../models/users.model";

router.post(
  "/accounts",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response): Promise<Response> => {
    const newAccount = await new Account(req.body);
    console.log(newAccount);
    const cr = await newAccount.save();
    console.log(cr);
    return res.send(cr);
  }
);

router.get(
  "/accounts",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.userid) {
      return res.status(400).json({ msg: "All fields are Required" });
    }

    const user = await User.findById({ _id: req.body.userid });

    if (!user) {
      return res.status(400).json({ msg: "This User no Exist" });
    }

    const accounts = await Account.find({ userid: req.body.userid });
    if (!accounts) {
      return res.status(400).json({ msg: "No find datas" });
    }
    return res.send(accounts);
  }
);

router.get(
  "/account",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.accountid) {
      return res.status(400).json({ msg: "All fields are Required" });
    }
    const user = await User.findById({ _id: req.body.userid });
    if (!user) {
      return res.status(400).json({ msg: "User Invalid" });
    }

    const account = await Account.findOne({
      _id: req.body.accountid,
      userid: user.id,
    });
    if (!account) {
      return res.status(400).json({ msg: "Account not Found" });
    }

    return res.send(account);
  }
);

export default router;
