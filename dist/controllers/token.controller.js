"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_model_1 = __importDefault(require("../models/token.model"));
class TokenController {
}
TokenController.create = (req, res) => { };
TokenController.check = (req, res, next) => {
    // Check if token is valid
    const token = req.body.token;
    token_model_1.default.findOne({
        token: token,
    }).then((result) => {
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
        req.body.meta__status == result.status;
        next();
    });
};
exports.default = TokenController;
