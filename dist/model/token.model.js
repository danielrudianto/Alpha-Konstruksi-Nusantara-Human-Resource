"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TokenSchema = new mongoose_1.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
        minlength: 36,
        maxlength: 36,
    },
    candidateName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["active", "expired", "pristine"],
        default: "pristine",
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    createdByName: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    testID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "tests",
    },
    expiryDate: {
        type: Date,
        default: Date.now,
    },
});
const TokenModel = (0, mongoose_1.model)("tokens", TokenSchema);
exports.default = TokenModel;
