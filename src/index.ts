import app from "./app";
import { port } from "./constants";
import connectDB from "./db/index";

import { config } from "dotenv";

config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`The server is running on port : ${port}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed!", err);
  });
