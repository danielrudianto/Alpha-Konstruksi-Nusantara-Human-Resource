"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const token_model_1 = __importDefault(require("../models/token.model"));
class AuthorizationMiddleware {
}
AuthorizationMiddleware.intercept = (req, res, next) => {
    var _a;
    const authorization = ((_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.toString()) || "";
    if (!authorization) {
        return res.status(401).send({
            message: "Token not found.",
        });
    }
    const jwtToken = authorization.split(" ")[1];
    if (!jwtToken) {
        return res.status(401).send({
            message: "Token not found.",
        });
    }
    const payload = (0, jsonwebtoken_1.decode)(jwtToken);
    if (!payload || typeof payload === "string") {
        return res.status(401).send({
            message: "Token not found.",
        });
    }
    const token = payload.token;
    token_model_1.default.findOne({
        token: token,
    }).then((result) => {
        // Check if token is valid
        if (!result) {
            return res.status(401).send({
                message: "Token not found.",
            });
        }
        if (result.expiredAt.getTime() < Date.now()) {
            return res.status(401).send({
                message: "Token expired.",
            });
        }
        if (result.currentStatus == "test submitted") {
            return res.status(401).send({
                message: "Test has been submitted.",
            });
        }
        req.body.token = result.token;
        next();
    });
};
AuthorizationMiddleware.interceptAdministrator = (req, res, next) => {
    var _a;
    const authorization = ((_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.toString()) || "";
    if (!authorization) {
        return res.status(401).send({
            message: "Token not found.",
        });
    }
    const jwtToken = authorization.split(" ")[1];
    if (!jwtToken) {
        return res.status(401).send({
            message: "Token not found.",
        });
    }
    (0, jsonwebtoken_1.verify)(jwtToken, process.env.JWT_ADMINISTRATOR_SECRET, (error, decoded) => {
        if (error) {
            console.error(`[error]: Error while verifying token: ${error}`);
            return res.status(401).send({
                message: "Token not verified.",
            });
        }
        const payload = (0, jsonwebtoken_1.decode)(jwtToken);
        req.body.meta__userID = payload.id;
        next();
    });
};
exports.default = AuthorizationMiddleware;
