import { Router, Request, Response } from "express";
import passport, { session } from "passport";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
dotenv.config();

import Account, { IAccount } from "../models/accounts.model";
import User, { IUser } from "../models/users.model";

const secretCrypt = process.env.ACCOUNT_SECRET;

const router = Router();
router.post(
  "/accounts",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response): Promise<Response> => {
    const newAccount = await new Account(req.body);
    const account = await newAccount.save();
    return res.send(account);
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

router.get(
  "/account/password",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.user || !req.body.password) {
      return res.status(400).json({ msg: "All Fields are Required" });
    }

    const user = await User.findOne({ user: req.body.user });
    if (!user) {
      return res.status(400).json({ msg: "This User no Exist" });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "User or Passwor are Incorrect" });
    }
    const account = await Account.findOne({
      userid: user._id,
      _id: req.body.accountid,
    });
    if (!account) {
      return res.status(400).json({ msg: "Account not Find" });
    }
    const decrypt = await CryptoJS.AES.decrypt(
      account.password,
      `${secretCrypt}`
    );
    if (!decrypt) {
      return res.status(500).json({ msg: "Error to get password" });
    }

    const pass = await decrypt.toString(CryptoJS.enc.Utf8);

    return res.status(200).send(pass);
  }
);

router.delete(
  "/account",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.user || !req.body.password) {
      return res.status(400).json({ msg: "All Fields are Required" });
    }

    const user = await User.findOne({ user: req.body.user });
    if (!user) {
      return res.status(400).json({ msg: "This User no Exist" });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "User or Passwor are Incorrect" });
    }
    const account = await Account.findOne({
      userid: user._id,
      _id: req.body.accountid,
    });
    if (!account) {
      return res.status(400).json({ msg: "Account not Find" });
    }
    await Account.findOneAndDelete({
      _id: account._id,
      userid: account.userid,
    });
    return res.status(201).json({ msg: "Account has ben Removed" });
  }
);

export default router;
