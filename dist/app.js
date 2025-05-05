"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const token_routes_1 = __importDefault(require("./routes/token.routes"));
const curriculum_routes_1 = __importDefault(require("./routes/curriculum.routes"));
const test_routes_1 = __importDefault(require("./routes/test.routes"));
const administrator_test_routes_1 = __importDefault(require("./routes/administrator-test.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const result_routes_1 = __importDefault(require("./routes/result.routes"));
const opening_routes_1 = __importDefault(require("./routes/opening.routes"));
const meet_routes_1 = __importDefault(require("./routes/meet.routes"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const peer_1 = require("peer");
const rtc_handler_1 = require("./utils/rtc.handler");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/token", token_routes_1.default);
app.use("/curriculum", curriculum_routes_1.default);
app.use("/administrator/test", administrator_test_routes_1.default);
app.use("/test", test_routes_1.default);
app.use("/auth", auth_routes_1.default);
app.use("/result", result_routes_1.default);
app.use("/opening", opening_routes_1.default);
app.use("/meet", meet_routes_1.default);
app.use("/peerjs", (0, peer_1.ExpressPeerServer)(server));
server.listen(5000, () => {
    console.log("Server is running on port 5000.");
    (0, mongoose_1.connect)("mongodb://localhost:27017/alpha", {}).then(() => {
        console.log("Database is connected.");
    });
});
(0, peer_1.ExpressPeerServer)(server).listen(9200, () => {
    console.log("Peer server is running on port 9200.");
});
io.on("connection", rtc_handler_1.RTCHandler);
