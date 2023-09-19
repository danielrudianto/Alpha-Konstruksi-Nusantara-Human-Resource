"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const curriculum_model_1 = __importDefault(require("../models/curriculum.model"));
const token_model_1 = __importDefault(require("../models/token.model"));
class ResultController {
}
ResultController.fetch = (req, res) => {
    const page = !req.query.page ? 1 : parseInt(req.query.page.toString());
    const status = !req.query.status ? "all" : req.query.status.toString();
    switch (status.toLowerCase()) {
        case "test-submitted":
            break;
        case "all":
        default:
            Promise.all([
                curriculum_model_1.default.find({})
                    .limit(20)
                    .skip((page - 1) * 20),
                curriculum_model_1.default.count({}),
            ])
                .then((curriculums) => {
                const curriculum = curriculums[0];
                const count = curriculums[1];
                token_model_1.default.find({
                    token: {
                        $in: curriculum.map((curriculum) => curriculum.token),
                    },
                })
                    .then((tokens) => {
                    return res.status(200).send({
                        data: curriculum.map((x) => {
                            var _a;
                            return {
                                token: x.token,
                                name: x.name,
                                email: x.email,
                                phoneNumber: x.phoneNumber,
                                nickName: x.nickName,
                                status: (_a = tokens.find((y) => y.token == x.token)) === null || _a === void 0 ? void 0 : _a.currentStatus,
                                age: (new Date().getTime() - x.dateOfBirth.getTime()) /
                                    (1000 * 60 * 60 * 24 * 365),
                                result: 0,
                            };
                        }),
                        count: count,
                    });
                })
                    .catch((error) => {
                    console.error(`[error]: Error on fetching tokens. ${error.message}`);
                    return res.status(500).send({
                        message: "Internal server error",
                    });
                });
            })
                .catch((error) => {
                console.error(`[error]: Error on fetching curriculums. ${error.message}`);
                return res.status(500).send({
                    message: "Internal server error",
                });
            });
            break;
    }
};
exports.default = ResultController;
