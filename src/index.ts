import express from "express";
const app = express();

const PORT = process.env.PORT || 4000;
class server {
  constructor(protected PORT: any) {
    this.PORT = PORT;
  }
  start(PORT: any) {
    console.log(`Server its runing on Port: ${PORT}`);
  }
}
const serve = new server(PORT);
serve.start(PORT);
