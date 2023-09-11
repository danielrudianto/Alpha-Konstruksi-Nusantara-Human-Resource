"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_model_1 = __importDefault(require("../models/test.model"));
const token_model_1 = __importDefault(require("../models/token.model"));
class TestController {
}
TestController.create = (req, res) => {
    const answer = req.body;
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
        if (result.status.find((x) => x.status === "test submitted")) {
            return res.status(400).send({
                message: "Test already submitted.",
            });
        }
        if (!result.status.find((x) => x.status === "cv submitted")) {
            return res.status(400).send({
                message: "CV not submitted.",
            });
        }
        result.status.push({
            status: "test submitted",
            createdAt: Date.now(),
        });
        result.save().then(() => {
            test_model_1.default.create({
                token: token,
                result: 0,
                answer: answer,
            })
                .then(() => {
                return res.status(200).send({
                    token: token,
                });
            })
                .catch((error) => {
                console.error(`[error]: Error on creating test. ${error}`);
                return res.status(500).send({
                    message: "Internal server error.",
                });
            });
        });
    });
};
TestController.fetch = (req, res) => {
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
        if (result.status.find((x) => x.status === "test submitted")) {
            return res.status(400).send({
                message: "Test already submitted.",
            });
        }
        if (!result.status.find((x) => x.status === "cv submitted")) {
            return res.status(400).send({
                message: "CV not submitted.",
            });
        }
        const testFile = result.testName;
        // Read from file
        const test = require(`../data/tests/${testFile}.json`);
        return res.status(200).send({
            questions: test,
            expiredAt: result.expiredAt,
        });
    });
};
exports.default = TestController;
