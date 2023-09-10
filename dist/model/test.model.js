"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const QuestionSchema = new mongoose_1.Schema({
    question: {
        type: String,
        required: true,
    },
    point: {
        type: Number,
        required: true,
        min: 5,
        max: 25,
    },
});
const TestSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    questions: [QuestionSchema],
    createdByName: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    version: {
        type: Number,
        required: true,
    },
    isDelete: {
        type: Boolean,
        required: true,
        default: false,
    },
    deletedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: false,
        default: null,
    },
    deletedByName: {
        type: String,
        required: false,
        default: null,
    },
    deletedAt: {
        type: Date,
        required: false,
        default: null,
    },
});
const TestModel = (0, mongoose_1.model)("tests", TestSchema);
exports.default = TestModel;
