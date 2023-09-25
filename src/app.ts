import express from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import cors from "cors";

import tokenRoutes from "./routes/token.routes";
import curriculumRoutes from "./routes/curriculum.routes";
import testRoutes from "./routes/test.routes";
import authRoutes from "./routes/auth.routes";
import resultRoutes from "./routes/result.routes";

import { Server } from "socket.io";
import http from "http";

import { ExpressPeerServer } from "peer";

config();

const app = express();

const corsOptions: cors.CorsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

const server = http.createServer(app);
const io  = new Server(server);

app.use(cors(corsOptions));

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/token", tokenRoutes);
app.use("/curriculum", curriculumRoutes);
app.use("/test", testRoutes);
app.use("/auth", authRoutes);
app.use("/result", resultRoutes);

app.use("/peerjs", ExpressPeerServer(server))

server.listen(5000, () => {
  console.log("Server is running on port 5000.");
  connect("mongodb://localhost:27017/alpha", {}).then(() => {
    console.log("Database is connected.");
  });
});

io.on("connection", (socket) => {
  console.log(`[info]: A user has connected.`);

  socket.on("join-room", (data) => {
    const roomID = data.roomID;
    const peerID = data.peerID;

    socket.join(roomID);
    console.log(`[info]: Someone is joining the room ${roomID}`);

    socket.emit("on-join-room", {
      peerID: peerID,
      roomID: roomID,
    })

    socket.join(roomID);
    // socket.to(roomID).emit("user-connected", userID);

    // socket.on("disconnect", () => {
    //   socket.to(roomID).emit("user-disconnected", userID);
    //   console.log(`[info]: A user has been disconnected.`);
    // })
  })
})
