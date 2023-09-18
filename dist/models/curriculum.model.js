"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CurriculumSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    nickName: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
        unique: true,
        ref: "tokens.token",
    },
});
const CurriculumModel = (0, mongoose_1.model)("curriculums", CurriculumSchema);
exports.default = CurriculumModel;
