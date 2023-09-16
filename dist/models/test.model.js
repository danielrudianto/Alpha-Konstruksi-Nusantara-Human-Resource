"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
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
});
const TestModel = (0, mongoose_1.model)("tests", TestSchema);
exports.default = TestModel;
