import express from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import cors from "cors";

import tokenRoutes from "./routes/token.routes";
import curriculumRoutes from "./routes/curriculum.routes";
import testRoutes from "./routes/test.routes";
import authRoutes from "./routes/auth.routes";
import resultRoutes from "./routes/result.routes";
import ResultController from "./controllers/result.controller";

config();

const app = express();

const corsOptions: cors.CorsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/token", tokenRoutes);
app.use("/curriculum", curriculumRoutes);
app.use("/test", testRoutes);
app.use("/auth", authRoutes);
app.use("/result", resultRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000.");
  connect("mongodb://localhost:27017/alpha", {}).then(() => {
    console.log("Database is connected.");
  });
});
