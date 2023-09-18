"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const resultSchema = new mongoose_1.Schema({
    testID: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "tests._id",
    },
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const resultModel = (0, mongoose_1.model)("results", resultSchema);
exports.default = resultModel;
