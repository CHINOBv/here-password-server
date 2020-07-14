import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  user: {
    unique: true,
    required: true,
    type: String,
  },
  name: {
    type: String,
    unique: false,
    required: false,
  },
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
});

export interface IUser extends Document {
  name: string;
  user: string;
  password: string;
  email: string;
  comparePassword: (password: string) => Promise<boolean>;
}

userSchema.pre<IUser>("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  const passHash = await bcrypt.hash(user.password, salt);
  user.password = await passHash;
  next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const res = await bcrypt.compare(password, this.password);
  console.log(res);
  return res;
};

export default model<IUser>("User", userSchema);
