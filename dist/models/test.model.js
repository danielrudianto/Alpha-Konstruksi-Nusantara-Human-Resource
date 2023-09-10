"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TestAnswerSchema = new mongoose_1.Schema({
    answer: {
        type: String,
    },
});
const TestSchema = new mongoose_1.Schema({
    token: {
        type: String,
        required: true,
        ref: "tokens.token",
        unique: true,
    },
    result: {
        type: Number,
        required: true,
    },
    answer: {
        type: [TestAnswerSchema],
    },
});
const TestModel = (0, mongoose_1.model)("tests", TestSchema);
exports.default = TestModel;
