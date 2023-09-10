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
const token_model_1 = __importDefault(require("../models/token.model"));
class CurriculumController {
}
_a = CurriculumController;
CurriculumController.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.token;
    const testToken = yield token_model_1.default.findOne({
        token: token,
    });
    if (!testToken) {
        return res.status(400).send({
            message: "Token not found.",
        });
    }
    curriculum_model_1.default.findOne({
        token: token,
    })
        .then((curriculum) => {
        if (curriculum) {
            return res.status(400).send({
                message: "Curriculum already submitted.",
            });
        }
        // Create curriculum
        curriculum_model_1.default.create(req.body)
            .then((result) => __awaiter(void 0, void 0, void 0, function* () {
            testToken.status.push({
                status: "cv submitted",
                date: new Date(),
            });
            // Set expiry date to 1 hour from now
            testToken.expiredAt = new Date(Date.now() + 60 * 60 * 1000);
            yield testToken.save();
            return res.status(201).send(result);
        }))
            .catch((error) => {
            console.log(error);
            return res.status(500).send(error);
        });
    })
        .catch((error) => {
        console.log(error);
        return res.status(500).send({
            message: "Internal server error.",
        });
    });
});
exports.default = CurriculumController;
