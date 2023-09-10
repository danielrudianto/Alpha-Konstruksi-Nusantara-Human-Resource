"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const meta_controller_1 = __importDefault(require("../controllers/meta.controller"));
const token_controller_1 = __importDefault(require("../controllers/token.controller"));
const router = (0, express_1.Router)();
router.post("/submit", token_controller_1.default.check, meta_controller_1.default.create);
router.post("/");
exports.default = router;
