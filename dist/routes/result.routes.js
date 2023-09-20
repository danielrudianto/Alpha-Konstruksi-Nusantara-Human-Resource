"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const result_controller_1 = __importDefault(require("../controllers/result.controller"));
const authorization_middleware_1 = __importDefault(require("../utils/authorization.middleware"));
const router = (0, express_1.Router)();
router.get("/", result_controller_1.default.fetch);
router.get("/check-answer/:token", authorization_middleware_1.default.interceptAdministrator, result_controller_1.default.fetchByToken);
router.put("/update-score", authorization_middleware_1.default.interceptAdministrator, result_controller_1.default.updateScore);
exports.default = router;
