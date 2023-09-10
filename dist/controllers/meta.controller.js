"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const meta_model_1 = __importDefault(require("../models/meta.model"));
class MetaController {
}
MetaController.create = (req, res) => {
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const address = req.body.address;
    const dateOfBirth = req.body.dateOfBirth;
    meta_model_1.default.create({
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        address: address,
        dateOfBirth: dateOfBirth,
        token: req.body.token,
    })
        .then((result) => {
        return res.status(201).send(result);
    })
        .catch((error) => {
        console.error(`[error]: Error: ${error}`);
        return res.status(500).send({
            message: "Internal server error.",
        });
    });
};
exports.default = MetaController;
