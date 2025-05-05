"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const meet_controller_1 = __importDefault(require("../controllers/meet.controller"));
const authorization_middleware_1 = __importDefault(require("../utils/authorization.middleware"));
const router = (0, express_1.Router)();
router.post("/availability", meet_controller_1.default.checkRoomAvailablility);
router.post("/", authorization_middleware_1.default.interceptAdministrator, (0, express_validator_1.body)("roomID").notEmpty().withMessage("Room ID is required."), meet_controller_1.default.create);
exports.default = router;
