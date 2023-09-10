"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_model_1 = __importDefault(require("../model/test.model"));
class TestController {
}
TestController.create = (req, res) => {
    const role = req.body.role;
    const questions = req.body.questions;
    const createdByName = req.body.meta__createdByName;
    const createdById = req.body.meta__createdById;
    test_model_1.default.count({
        role: role,
    })
        .then((count) => {
        const version = count + 1;
        test_model_1.default.create({
            role: role,
            questions: questions,
            createdByName: createdByName,
            createdBy: createdById,
            createdAt: new Date(),
            version: version,
        })
            .then((result) => {
            return res.status(201).send(result);
        })
            .catch((error) => {
            console.error(`[error]: Error on creating test with role ${role}: ${error.toString()}`);
            return res.status(500).send(error);
        });
    })
        .catch((error) => {
        console.error(`[error]: Error on counting test with role ${role}: ${error.toString()}`);
        return res.status(500).send(error);
    });
};
TestController.fetch = (req, res) => {
    const keyword = req.body.keyword;
    const page = req.body.page;
    const limit = 20;
    test_model_1.default.find({
        isDelete: false,
        name: { $regex: keyword, $options: "i" },
    })
        .limit(limit)
        .skip((page - 1) * limit)
        .then((result) => {
        return res.status(200).send(result);
    })
        .catch((error) => {
        console.error(`[error]: Error on fetching test: ${error.toString()}`);
        return res.status(500).send(error);
    });
};
TestController.delete = (req, res) => {
    const id = req.params.id;
    const deletedByName = req.body.meta__createdByName;
    const deletedById = req.body.meta__createdById;
    test_model_1.default.findByIdAndUpdate(id, {
        isDelete: true,
        deletedByName: deletedByName,
        deletedBy: deletedById,
        deletedAt: new Date(),
    })
        .then((result) => {
        return res.status(201).send(result);
    })
        .catch((error) => {
        console.error(`[error]: Error on deleting test with id ${id}: ${error.toString()}`);
        return res.status(500).send(error);
    });
};
exports.default = TestController;
