"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TokenStatusSchema = new mongoose_1.Schema({
    status: {
        type: String,
        enum: ["published", "meta submitted", "cv submitted", "test submitted"],
        default: "published",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const TokenSchema = new mongoose_1.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiredAt: {
        type: Date,
        // Default 2 days from now
        default: Date.now() + 2 * 24 * 60 * 60 * 1000,
    },
    status: {
        type: [TokenStatusSchema],
        default: [],
    },
});
const TokenModel = (0, mongoose_1.model)("tokens", TokenSchema);
exports.default = TokenModel;
