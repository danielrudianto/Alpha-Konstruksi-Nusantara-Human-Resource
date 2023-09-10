"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_list_1 = require("../data/error-list");
const token_model_1 = __importDefault(require("../model/token.model"));
const alpha_konstruksi_nusantara_common_1 = require("@terra-nusa-teknologi/alpha-konstruksi-nusantara-common");
class TokenController {
}
TokenController.generateToken = (req, res) => {
    // Generate a 36 character token
    const character = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let token = "";
    for (let i = 0; i < 36; i++) {
        token += character[Math.floor(Math.random() * character.length)];
    }
    const date = new Date();
    const expiryDate = new Date(date.setDate(date.getDate() + 1));
    date.setHours(0, 0, 0, 0);
    expiryDate.setHours(0, 0, 0, 0);
    const candidateName = req.body.candidateName;
    token_model_1.default.create({
        token: token,
        createdBy: req.body.createdBy,
        createdByName: req.body.createdByName,
        testID: req.body.testID,
        createdAt: date,
        expiryDate: expiryDate,
        candidateName: candidateName,
    })
        .then((result) => {
        return res.status(201).send(result);
    })
        .catch((error) => {
        console.error(`[error]: Error on generating token: ${error}`);
        throw new alpha_konstruksi_nusantara_common_1.BadRequestError(error_list_1.ErrorList["INTERNAL_SERVER_ERROR"]);
    });
};
TokenController.checkToken = (req, res) => {
    const token = req.params.token;
    token_model_1.default.findOne({
        token: token,
    })
        .then((result) => {
        if (!token) {
            return res.status(404).send({
                message: error_list_1.ErrorList["TOKEN_NOT_FOUND"],
            });
        }
        return res.status(200).send(result);
    })
        .catch((error) => {
        console.error(`[error]: Error on checking token: ${error}`);
        return res.status(500).send({
            message: error_list_1.ErrorList["INTERNAL_SERVER_ERROR"],
        });
    });
};
TokenController.updateTokenStatus = (req, res) => {
    const token = req.body.token;
    const status = req.body.status;
    // If it was pristine, can only be updated to active or expired
    // If it was active, can only be updated to expired
    // If it was expired, cannot be updated
    token_model_1.default.findOne({
        token: token,
    }).then((result) => {
        if (!result) {
            return res.status(404).send({
                message: error_list_1.ErrorList["TOKEN_NOT_FOUND"],
            });
        }
        if (result.status === "pristine" &&
            (status == "active" || status == "expired")) {
            token_model_1.default.updateOne({
                token: token,
            }, {
                status: status,
            })
                .then((result) => {
                return res.status(200).send(result);
            })
                .catch((error) => {
                console.error(`[error]: Error on updating token status: ${error}`);
                return res.status(500).send({
                    message: error_list_1.ErrorList["INTERNAL_SERVER_ERROR"],
                });
            });
        }
        if (result.status === "active" && status == "expired") {
            token_model_1.default.updateOne({
                token: token,
            }, {
                status: status,
            })
                .then((result) => {
                return res.status(200).send(result);
            })
                .catch((error) => {
                console.error(`[error]: Error on updating token status: ${error}`);
                return res.status(500).send({
                    message: error_list_1.ErrorList["INTERNAL_SERVER_ERROR"],
                });
            });
        }
        if (result.status === "expired") {
            return res.status(400).send({
                message: error_list_1.ErrorList["TOKEN_EXPIRED"],
            });
        }
        return res.status(400).send({
            message: error_list_1.ErrorList["TOKEN_NOT_FOUND"],
        });
    });
};
exports.default = TokenController;
