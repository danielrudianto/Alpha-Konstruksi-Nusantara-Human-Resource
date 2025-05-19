"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const user_model_1 = __importDefault(require("../models/user.model"));
class AuthController {
}
AuthController.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(`[info]: Login attempt with username: ${username}`);
    user_model_1.default
        .findOne({
        username: username,
    })
        .then((user) => {
        if (!user) {
            return res.status(401).send({
                message: "User not found",
            });
        }
        (0, bcrypt_1.compare)(password, user.password)
            .then((value) => {
            if (value) {
                const token = (0, jsonwebtoken_1.sign)({
                    id: user._id,
                    name: user.name,
                    username: user.username,
                }, process.env.JWT_ADMINISTRATOR_SECRET, {
                    expiresIn: "7d",
                });
                return res.status(201).send({
                    token: token,
                    name: user.name,
                });
            }
            else {
                return res.status(401).send({
                    message: "Wrong password",
                });
            }
        })
            .catch((error) => {
            console.error(`[error]: Error on login: ${error}`);
            return res.status(500).send({
                message: "Internal Server Error",
            });
        });
    })
        .catch((error) => {
        console.error(`[error]: Error on login: ${error}`);
        return res.status(500).send({
            message: "Internal Server Error",
        });
    });
};
exports.default = AuthController;
