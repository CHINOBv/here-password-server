import mongoose, { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import CryptoJS = require("crypto-js");
import dotevn from "dotenv";
dotevn.config();

const secretCryp = process.env.ACCOUNT_SECRET;

const ObjectID = mongoose.Types.ObjectId;

export interface IAccount extends Document {
  userid: string;
  user: string;
  email: string;
  password: string;
  page: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const accountSchema = new Schema({
  userid: {
    type: ObjectID,
    required: true,
  },
  user: String,
  email: String,
  password: String,
  page: String,
});

accountSchema.pre<IAccount>("save", async function (next) {
  const account = this;

  if (!account.isModified("password")) {
    return next();
  }

  const encrypted = await CryptoJS.AES.encrypt(
    account.password,
    `${secretCryp}`
  );
  account.password = await encrypted.toString();

  next();
});

accountSchema.methods.comparePassword = async function (
  password: string
): Promise<string> {
  const secretCryp = process.env.ACCOUNT_SECRET;
  console.log(secretCryp);

  const decrypted = await CryptoJS.AES.decrypt(this.password, `${secretCryp}`);
  const pass = await decrypted.toString(CryptoJS.enc.Utf8);
  return pass;
};

export default model<IAccount>("Account", accountSchema);
