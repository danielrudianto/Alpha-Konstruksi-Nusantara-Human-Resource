"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MeetSchema = new mongoose_1.Schema({
    roomID: {
        type: String,
        required: true,
        unique: true,
    },
    createdBy: {
        type: mongoose_1.Types.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});
const MeetModel = (0, mongoose_1.model)("meets", MeetSchema);
exports.default = MeetModel;
