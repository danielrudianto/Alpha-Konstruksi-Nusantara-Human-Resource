"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ExpirienceSchema = new mongoose_1.Schema({
    company: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
});
const CertificationSchema = new mongoose_1.Schema({
    issuer: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
});
const educationSchema = new mongoose_1.Schema({
    school: {
        type: String,
        required: true,
    },
    major: {
        type: String,
        required: true,
    },
    entry: {
        type: Number,
        required: true,
    },
    graduate: {
        type: Number,
        required: true,
    },
    gpa: {
        type: Number,
        required: true,
    },
    thesis: {
        type: String,
        required: false,
    },
});
const CurriculumSchema = new mongoose_1.Schema({
    name: {
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
    phoneNumber: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    education: {
        type: educationSchema,
    },
    expiriences: {
        type: [ExpirienceSchema],
        required: false,
        default: [],
    },
    certifications: {
        type: [CertificationSchema],
        required: false,
        default: [],
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
