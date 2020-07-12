import app from "./app";
import dotenv from "dotenv";
dotenv.config();

import { startConnection } from "./db";

const PORT = process.env.PORT || 4000;

class server {
  constructor(protected PORT: any, protected app: any) {}

  startDB() {
    startConnection();
    console.log("DB Is Connected");
  }
  startServer() {
    app.listen(PORT);
    console.log(`Server its runing on Port: ${PORT}`);
  }
  async initServer() {
    await this.startDB();
    await this.startServer();
  }
}
const serve = new server(PORT, app);
serve.initServer();
