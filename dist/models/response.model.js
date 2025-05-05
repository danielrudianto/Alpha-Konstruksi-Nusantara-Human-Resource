"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FileResponseSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
        min: 0,
    },
    data: {
        type: String,
        required: true,
    },
});
const ResponseSchema = new mongoose_1.Schema({
    token: {
        type: String,
        required: true,
        ref: "tokens.token",
    },
    questionID: {
        type: String,
    },
    answer: {
        type: String,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
    files: {
        type: [FileResponseSchema],
        default: [],
    },
    score: {
        type: Number,
        default: 0,
        required: true,
    },
    checkedAt: {
        type: Date,
        default: null,
    },
});
const ResponseModel = (0, mongoose_1.model)("responses", ResponseSchema);
exports.default = ResponseModel;
