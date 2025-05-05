"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ScheduleSchema = new mongoose_1.Schema({
    token: {
        type: String,
        required: true,
        ref: "tokens.token",
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
});
const ScheduleModel = (0, mongoose_1.model)("schedules", ScheduleSchema);
exports.default = ScheduleModel;
