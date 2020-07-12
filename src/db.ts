import mongoose, { ConnectionOptions } from "mongoose";

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

  await mongoose.connect(
    "mongodb://localhost:27017/webcomic",
    dbOptions,
    (err) => {
      if (!err) {
        console.log("MongoDB Connection Succeeded.");
      } else {
        console.log("Error in DB connection: " + err);
      }
    }
  );
}
