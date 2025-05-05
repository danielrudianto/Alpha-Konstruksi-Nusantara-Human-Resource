"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const opening_controller_1 = __importDefault(require("../controllers/opening.controller"));
const authorization_middleware_1 = __importDefault(require("../utils/authorization.middleware"));
const router = (0, express_1.Router)();
router.get("/", authorization_middleware_1.default.interceptAdministrator, opening_controller_1.default.fetch);
exports.default = router;
