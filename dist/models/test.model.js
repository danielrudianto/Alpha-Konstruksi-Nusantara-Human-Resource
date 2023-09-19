"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FileTestSchema = new mongoose_1.Schema({
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
const TestSchema = new mongoose_1.Schema({
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
        type: [FileTestSchema],
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
const TestModel = (0, mongoose_1.model)("tests", TestSchema);
exports.default = TestModel;
