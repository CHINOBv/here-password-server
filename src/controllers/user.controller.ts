import { Request, Response } from "express";
import User, { IUser } from "../models/users";

export const signUp = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ msg: "All fields are Required" });
  }
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ msg: "The user already exist" });
  }
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json(newUser);
};

export const signIn = (req: Request, res: Response) => {
  res.send("SignIn");
};
