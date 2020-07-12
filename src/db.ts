import mongoose, { ConnectionOptions } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//Get URI DB from file .env
const URI = process.env.DB_URI;
export async function startConnection() {
  mongoose.set("useUnifiedTopology", true);
  const dbOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  };
  /*Connect MongoDB at default port 27017.
    The URI we need to set it with environment variables,
    for more security
  */

  await mongoose.connect(`${URI}`, dbOptions, (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  });
}
