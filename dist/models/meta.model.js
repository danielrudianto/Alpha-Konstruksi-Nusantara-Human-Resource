"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MetaSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    token: {
        type: String,
        required: true,
        ref: "tokens",
    },
});
const MetaModel = (0, mongoose_1.model)("metas", MetaSchema);
exports.default = MetaModel;
