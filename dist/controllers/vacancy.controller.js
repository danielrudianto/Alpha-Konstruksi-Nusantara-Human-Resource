"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vacancy_model_1 = __importDefault(require("../models/vacancy.model"));
class VacancyController {
}
VacancyController.create = (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const createdBy = req.body.meta__createdBy;
    const createdByName = req.body.meta__createdByName;
    vacancy_model_1.default.create({
        title,
        description,
        createdBy,
        createdByName,
    })
        .then((result) => {
        return res.status(201).send(result);
    })
        .catch((error) => {
        return res.status(500).send(error);
    });
};
VacancyController.fetch = (req, res) => {
    // Fetching from known sources (officer, admin, etc.)
};
VacancyController.update = (req, res) => { };
VacancyController.delete = (req, res) => { };
VacancyController.fetchClient = (req, res) => {
    // Fetching from unknown sources (new candidates, etc.)
};
exports.default = VacancyController;
