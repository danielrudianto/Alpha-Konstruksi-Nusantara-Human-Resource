import express from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import cors from "cors";

import tokenRoutes from "./routes/token.routes";
import curriculumRoutes from "./routes/curriculum.routes";
import testRoutes from "./routes/test.routes";

config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/token", tokenRoutes);
app.use("/curriculum", curriculumRoutes);
app.use("/test", testRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000.");
  connect("mongodb://localhost:27017/alpha", {}).then(() => {
    console.log("Database is connected.");
  });
});
