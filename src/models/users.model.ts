import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  user: {
    unique: true,
    required: true,
    type: String,
  },
  name: String,
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
  if (
    !user.isModified("password") ||
    !user.isModified("email") ||
    !user.isModified("user")
  )
    return next();
  const salt = await bcrypt.genSalt(12);
  const passHash = await bcrypt.hash(user.password, salt);
  //const emailHash = await bcrypt.hash(user.email, salt);
  user.password = await passHash;
  //user.email = await emailHash;
  next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>("User", userSchema);
