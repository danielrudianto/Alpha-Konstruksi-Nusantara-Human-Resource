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
const curriculum_model_1 = __importDefault(require("../models/curriculum.model"));
const test_model_1 = __importDefault(require("../models/test.model"));
const token_model_1 = __importDefault(require("../models/token.model"));
class ResultController {
}
_a = ResultController;
ResultController.fetch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = !req.query.page ? 1 : parseInt(req.query.page);
    const status = req.query.mode;
    switch (status) {
        case "checked":
            const tokens = yield token_model_1.default.find({
                currentStatus: "checked",
            })
                .skip((page - 1) * 10)
                .limit(10);
            const curriculum = yield curriculum_model_1.default.find({
                token: {
                    $in: tokens.map((x) => x.token),
                },
            });
            const result = yield test_model_1.default.aggregate([
                {
                    $match: {
                        token: {
                            $in: tokens.map((x) => x.token),
                        },
                    },
                },
                {
                    $group: {
                        _id: "$token",
                        totalScore: {
                            $sum: "$score",
                        },
                    },
                },
            ]);
            const response = [];
            curriculum.forEach((x) => {
                const token = tokens.find((y) => y.token == x.token);
                const scoreIndex = result.findIndex((z) => {
                    return z._id == x.token;
                });
                response.push({
                    token: token,
                    curriculum: x,
                    score: scoreIndex != -1 ? result[scoreIndex].totalScore : 0,
                });
            });
            return res.status(200).send({
                data: response,
            });
        case "unchecked":
            let uncheckedTokens = yield token_model_1.default.find({
                $or: [
                    {
                        currentStatus: "test submitted",
                    },
                    {
                        currentStatus: "cv submitted",
                    },
                ],
            })
                .skip((page - 1) * 10)
                .limit(10);
            let uncheckedCurriculums = yield curriculum_model_1.default.find({
                token: {
                    $in: uncheckedTokens.map((x) => x.token),
                },
            });
            const uncheckedResult = yield test_model_1.default.aggregate([
                {
                    $match: {
                        token: {
                            $in: uncheckedTokens.map((x) => x.token),
                        },
                    },
                },
                {
                    $group: {
                        _id: "$token",
                        totalScore: {
                            $sum: "$score",
                        },
                    },
                },
            ]);
            const uncheckResponse = [];
            uncheckedCurriculums.forEach((x) => {
                const token = uncheckedTokens.find((y) => y.token == x.token);
                const scoreIndex = uncheckedResult.findIndex((z) => {
                    return z._id == x.token;
                });
                uncheckResponse.push({
                    token: token,
                    curriculum: x,
                    score: scoreIndex != -1 ? uncheckedResult[scoreIndex].totalScore : 0,
                });
            });
            return res.status(200).send({
                data: uncheckResponse,
            });
            break;
        case "interview":
            let interviewTokens = yield token_model_1.default.find({
                currentStatus: "interview",
            })
                .skip((page - 1) * 10)
                .limit(10);
            let interviewCurriculums = yield curriculum_model_1.default.find({
                token: {
                    $in: interviewTokens.map((x) => x.token),
                },
            });
            const interviewResult = yield test_model_1.default.aggregate([
                {
                    $match: {
                        token: {
                            $in: interviewTokens.map((x) => x.token),
                        },
                    },
                },
                {
                    $group: {
                        _id: "$token",
                        totalScore: {
                            $sum: "$score",
                        },
                    },
                },
            ]);
            const interviewResponse = [];
            interviewCurriculums.forEach((x) => {
                const token = interviewTokens.find((y) => y.token == x.token);
                const scoreIndex = interviewResult.findIndex((z) => {
                    return z._id == x.token;
                });
                interviewResponse.push({
                    token: token,
                    curriculum: x,
                    score: scoreIndex != -1 ? interviewResult[scoreIndex].totalScore : 0,
                });
            });
            return res.status(200).send({
                data: interviewResponse,
            });
            break;
        case "failed":
            let failedTokens = yield token_model_1.default.find({
                currentStatus: "failed",
            })
                .skip((page - 1) * 10)
                .limit(10);
            let failedCurriculums = yield curriculum_model_1.default.find({
                token: {
                    $in: failedTokens.map((x) => x.token),
                },
            });
            const failedResult = yield test_model_1.default.aggregate([
                {
                    $match: {
                        token: {
                            $in: failedTokens.map((x) => x.token),
                        },
                    },
                },
                {
                    $group: {
                        _id: "$token",
                        totalScore: {
                            $sum: "$score",
                        },
                    },
                },
            ]);
            const failedResponse = [];
            failedCurriculums.forEach((x) => {
                const token = failedTokens.find((y) => y.token == x.token);
                const scoreIndex = failedResult.findIndex((z) => {
                    return z._id == x.token;
                });
                failedResponse.push({
                    token: token,
                    curriculum: x,
                    score: scoreIndex != -1 ? failedResult[scoreIndex].totalScore : 0,
                });
            });
            return res.status(200).send({
                data: failedResponse,
            });
            break;
        case "all":
        default:
            let allTokens = yield token_model_1.default.find({
                $or: [
                    {
                        currentStatus: "test submitted",
                    },
                    {
                        currentStatus: "cv submitted",
                    },
                ],
            })
                .skip((page - 1) * 10)
                .limit(10);
            let allCurriculums = yield curriculum_model_1.default.find({
                token: {
                    $in: allTokens.map((x) => x.token),
                },
            });
            const allResult = yield test_model_1.default.aggregate([
                {
                    $match: {
                        token: {
                            $in: allTokens.map((x) => x.token),
                        },
                    },
                },
                {
                    $group: {
                        _id: "$token",
                        totalScore: {
                            $sum: "$score",
                        },
                    },
                },
            ]);
            const allResponse = [];
            allCurriculums.forEach((x) => {
                const token = allTokens.find((y) => y.token == x.token);
                const scoreIndex = allResult.findIndex((z) => {
                    return z._id == x.token;
                });
                allResponse.push({
                    token: token,
                    curriculum: x,
                    score: scoreIndex != -1 ? allResult[scoreIndex].totalScore : 0,
                });
            });
            return res.status(200).send({
                data: allResponse,
            });
            break;
    }
});
ResultController.fetchByToken = (req, res) => {
    const token = req.params.token;
    token_model_1.default.findOne({
        token: token,
    })
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        if (!result) {
            return res.status(404).send({
                message: "Token not found.",
            });
        }
        const tests = yield test_model_1.default.find({
            token: token,
        });
        const curriculum = yield curriculum_model_1.default.findOne({
            token: token,
        });
        const response = [];
        const testSet = require(`../data/tests/${result.testName}.json`);
        testSet.forEach((question) => {
            var _b;
            const answerIndex = tests.findIndex((x) => {
                return x.questionID == question.id;
            });
            response.push({
                id: question.id,
                answer: answerIndex == -1
                    ? ""
                    : (_b = tests[answerIndex].answer) === null || _b === void 0 ? void 0 : _b.replace(/(?:\r\n|\r|\n)/g, "<br>"),
                files: (answerIndex == -1 ? [] : tests[answerIndex].files) || [],
                question: question.question,
                score: answerIndex == -1 ? 0 : tests[answerIndex].score,
            });
        });
        return res.status(200).send({
            curriculum: curriculum,
            data: response,
        });
    }))
        .catch((error) => {
        console.error(`[error]: Error on fetch by token. ${error}`);
        return res.status(500).send({
            message: "Internal Server Error",
        });
    });
};
ResultController.updateScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const score = req.body.score;
    const token = req.body.token;
    const id = req.body.id;
    const test = yield test_model_1.default.findOne({
        token: token,
        questionID: id,
    });
    if (!test) {
        test_model_1.default.create({
            token: token,
            questionID: id,
            score: score,
            answer: "",
            files: [],
            submittedAt: new Date(),
        })
            .then((result) => {
            return res.status(201).send(result);
        })
            .catch((error) => {
            console.error(`[error]: Error on create test. ${error}`);
            return res.status(500).send({
                message: "Internal Server Error",
            });
        });
    }
    else {
        test.score = score;
        test
            .save()
            .then((result) => {
            return res.status(201).send(result);
        })
            .catch((error) => {
            console.error(`[error]: Error on create test. ${error}`);
            return res.status(500).send({
                message: "Internal Server Error",
            });
        });
    }
});
exports.default = ResultController;
