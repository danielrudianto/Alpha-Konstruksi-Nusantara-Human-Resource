"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const curriculum_model_1 = __importDefault(require("../models/curriculum.model"));
const test_model_1 = __importDefault(require("../models/test.model"));
const token_model_1 = __importDefault(require("../models/token.model"));
class TokenController {
}
_a = TokenController;
TokenController.create = (req, res) => { };
TokenController.check = (req, res) => {
    // Check if token is valid
    const token = req.body.token;
    token_model_1.default.findOne({
        token: token,
    }).then((result) => __awaiter(void 0, void 0, void 0, function* () {
        if (!result) {
            return res.status(400).send({
                message: "Token not found.",
            });
        }
        if (result.expiredAt.getTime() < Date.now()) {
            return res.status(400).send({
                message: "Token expired.",
            });
        }
        result.status.push({
            status: "logged in",
            createdAt: Date.now(),
        });
        // Check if CV is submitted
        const submittedCV = yield curriculum_model_1.default.findOne({
            token: token,
        });
        const submittedTest = yield test_model_1.default.findOne({
            token: token,
        });
        yield result.save();
        const jwt = (0, jsonwebtoken_1.sign)({
            token: token,
        }, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });
        return res.status(200).send({
            token: jwt,
            submittedCV: submittedCV ? true : false,
            submittedTest: submittedTest ? true : false,
        });
    }));
};
exports.default = TokenController;
