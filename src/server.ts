import { config } from "dotenv";
import mongoose from "mongoose";
import { app } from "./app";

config();
const port = process.env.PORT!;

app.listen(port, async () => {
  console.log(`[info]: Server started on port ${port}`);
  mongoose
    .connect(
      process.env.NODE_ENV == "production"
        ? "mongodb://alpha-konstruksi-nusantara-clusterip-auth-db-srv:27017/auth"
        : "mongodb://localhost:27017/auth",
      {
        autoCreate: true,
      }
    )
    .then(() => {
      console.log(
        `[info]: Connected to ${
          process.env.NODE_ENV == "production" ? "production" : "development"
        } database`
      );
    })
    .catch((err) => {
      console.log("[error]: Failed to connect to database");
      console.log(err);
    });
});
