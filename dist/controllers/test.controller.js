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
const test_model_1 = __importDefault(require("../models/test.model"));
const token_model_1 = __importDefault(require("../models/token.model"));
class TestController {
}
_a = TestController;
TestController.answer = (req, res) => {
    const questionID = req.body.questionID;
    const answer = req.body.answer;
    const files = req.body.files || [];
    const token = req.body.token;
    test_model_1.default.findOne({
        token: token,
        questionID: questionID,
    })
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        if (!result) {
            yield test_model_1.default.create({
                questionID: questionID,
                answer: answer,
                token: token,
                submittedAt: new Date(),
            });
            return res.status(201).send({
                answer: answer,
                questionID: questionID,
            });
        }
        else {
            if (files && files.length > 0) {
                result.files = files;
                result.answer = answer;
                result.submittedAt = new Date();
                yield result.save();
                return res.status(201).send({
                    answer: answer,
                    questionID: questionID,
                });
            }
            else {
                result.answer = answer;
                result.submittedAt = new Date();
                yield result.save();
                return res.status(201).send({
                    answer: answer,
                    questionID: questionID,
                });
            }
        }
    }))
        .catch((error) => {
        console.error(`[error]: Error on submitting test answer: ${error}`);
        return res.status(500).send(error);
    });
};
TestController.files = (req, res) => {
    const questionID = req.body.questionID;
    const files = req.body.files;
    const token = req.body.token;
    test_model_1.default.findOne({
        token: token,
        questionID: questionID,
    })
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        if (!result) {
            const createdTest = yield test_model_1.default.create({
                questionID: questionID,
                files: files.map((x) => {
                    return {
                        name: x.name,
                        size: x.size,
                        data: x.data,
                    };
                }),
                answer: null,
                token: token,
                submittedAt: new Date(),
            });
            return res.status(201).send({
                files: createdTest.files.map((x) => {
                    return {
                        _id: x.id,
                        name: x.name,
                        size: x.size,
                    };
                }),
                answer: null,
                questionID: questionID,
            });
        }
        else {
            return res.status(400).send({
                message: "Files already submitted.",
            });
        }
    }))
        .catch((error) => {
        console.error(`[error]: Error on submitting test answer: ${error}`);
        return res.status(500).send(error);
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
        test_model_1.default.find({
            token: token,
        }).then((answers) => {
            return res.status(200).send({
                questions: test.map((x) => {
                    const answer = answers.find((y) => y.questionID == x.id);
                    const files = answer && answer.files != null ? answer.files : [];
                    return {
                        id: x.id,
                        question: x.question,
                        answer: answer ? answer.answer : null,
                        files: files,
                        attachment: x.attachment,
                        notes: x.notes,
                        type: x.type,
                    };
                }),
                expiredAt: result.expiredAt,
            });
        });
    });
};
TestController.end = (req, res) => {
    const token = req.body.token;
    token_model_1.default.findOne({
        token: token,
    })
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        if (!result) {
            return res.status(400).send({
                message: "Token not found.",
            });
        }
        result.status.push({
            status: "test submitted",
            date: new Date(),
        });
        result.currentStatus = "test submitted";
        yield result.save();
        return res.status(201).send(result);
    }))
        .catch((error) => {
        return res.status(500).send(error);
    });
};
TestController.check = (req, res) => {
    const token = req.body.token;
    token_model_1.default.findOne({
        token: token,
    }).then((result) => {
        if (!result) {
            return res.status(404).send({
                message: "Token not found.",
            });
        }
        result.status.push({
            status: "checked",
            date: new Date(),
        });
        result.currentStatus = "checked";
        result
            .save()
            .then(() => {
            return res.status(201).send(result);
        })
            .catch((error) => {
            console.error(`[error]: Error while saving token: ${error}`);
            return res.status(500).send({
                message: "Internal Server Error",
            });
        });
    });
};
TestController.interview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.token;
    const tokenResult = yield token_model_1.default.findOne({
        token: token,
    });
    if (!tokenResult) {
        return res.status(404).send({
            message: "Token not found.",
        });
    }
    if (tokenResult.currentStatus == "interview") {
        return res.status(400).send({
            message: "Token already interviewed.",
        });
    }
    if (tokenResult.currentStatus != "checked") {
        return res.status(400).send({
            message: "Token not checked.",
        });
    }
    tokenResult.status.push({
        status: "interview",
        date: new Date(),
    });
    tokenResult.currentStatus = "interview";
    tokenResult
        .save()
        .then((result) => {
        return res.status(201).send(result);
    })
        .catch((error) => {
        console.error(`[error]: Error on updating token: ${error}`);
        return res.status(500).send({
            message: "Internal Server Error",
        });
    });
});
TestController.failed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.token;
    const tokenResult = yield token_model_1.default.findOne({
        token: token,
    });
    if (!tokenResult) {
        return res.status(404).send({
            message: "Token not found.",
        });
    }
    if (tokenResult.currentStatus == "failed") {
        return res.status(400).send({
            message: "Token already interviewed.",
        });
    }
    if (tokenResult.currentStatus != "checked") {
        return res.status(400).send({
            message: "Token not checked.",
        });
    }
    tokenResult.status.push({
        status: "failed",
        date: new Date(),
    });
    tokenResult.currentStatus = "failed";
    tokenResult
        .save()
        .then((result) => {
        return res.status(201).send(result);
    })
        .catch((error) => {
        console.error(`[error]: Error on updating token: ${error}`);
        return res.status(500).send({
            message: "Internal Server Error",
        });
    });
});
exports.default = TestController;
