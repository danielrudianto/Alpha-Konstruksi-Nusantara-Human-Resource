import express, { json } from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import cors from "cors";

import tokenRoutes from "./routes/token.routes";
import curriculumRoutes from "./routes/curriculum.routes";
import testRoutes from "./routes/test.routes";
import administratorTestRoutes from "./routes/administrator-test.routes";
import authRoutes from "./routes/auth.routes";
import resultRoutes from "./routes/result.routes";
import openingRoutes from "./routes/opening.routes";
import meetRoutes from "./routes/meet.routes";

// import { Server } from "socket.io";
import http from "http";

// import { ExpressPeerServer } from "peer";
// import { RTCHandler } from "./utils/rtc.handler";

config();

const app = express();

const server = http.createServer(app);
// const io = new Server(server);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/token", tokenRoutes);
app.use("/curriculum", curriculumRoutes);
app.use("/administrator/test", administratorTestRoutes);
app.use("/test", testRoutes);
app.use("/auth", authRoutes);
app.use("/result", resultRoutes);
app.use("/opening", openingRoutes);
app.use("/meet", meetRoutes);

// app.use("/peerjs", ExpressPeerServer(server));

server.listen(5000, () => {
  console.log("Server is running on port 5000.");
  connect("mongodb://127.0.0.1:27017/alpha", {}).then(() => {
    console.log("Database is connected.");
  });
});

// ExpressPeerServer(server).listen(9200, () => {
//   console.log("Peer server is running on port 9200.");
// });

// io.on("connection", RTCHandler);
