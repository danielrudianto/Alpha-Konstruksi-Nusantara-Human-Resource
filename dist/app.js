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
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["https://hrd.alphakonstruksi.id", "http://127.0.0.1"],
}));
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://hrd.alphakonstruksi.id");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    next();
});
app.use("/token", token_routes_1.default);
app.use("/curriculum", curriculum_routes_1.default);
app.use("/test", test_routes_1.default);
app.listen(5000, () => {
    console.log("Server is running on port 5000.");
    (0, mongoose_1.connect)("mongodb://localhost:27017/alpha", {}).then(() => {
        console.log("Database is connected.");
    });
});
