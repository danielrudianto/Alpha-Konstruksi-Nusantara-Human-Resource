"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VacancySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose_1.Types.ObjectId,
        required: true,
    },
    createdByName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true,
    },
    deletedBy: {
        type: mongoose_1.Types.ObjectId,
        default: null,
    },
    deletedByName: {
        type: String,
        default: null,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
});
const VacancyModel = (0, mongoose_1.model)("vacancies", VacancySchema);
exports.default = VacancyModel;
