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
const allowedOrigins = ["https://hrd.alphakonstruksi.id"]; // Add your frontend domains here
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/token", token_routes_1.default);
app.use("/curriculum", curriculum_routes_1.default);
app.use("/test", test_routes_1.default);
app.listen(5000, () => {
    console.log("Server is running on port 5000.");
    (0, mongoose_1.connect)("mongodb://localhost:27017/alpha", {}).then(() => {
        console.log("Database is connected.");
    });
});
