"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const curriculum_controller_1 = __importDefault(require("../controllers/curriculum.controller"));
const authorization_middleware_1 = __importDefault(require("../utils/authorization.middleware"));
const router = (0, express_1.Router)();
router.post("/", authorization_middleware_1.default.intercept, curriculum_controller_1.default.create);
exports.default = router;
