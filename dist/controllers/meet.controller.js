"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const meet_model_1 = __importDefault(require("../models/meet.model"));
const rtc_handler_1 = require("../utils/rtc.handler");
class MeetController {
}
MeetController.create = (req, res) => {
    // Create a room
    const roomID = req.body.roomID;
    const createdBy = req.body.meta__createdBy;
    const createdByName = req.body.meta__createdByName;
    // Check if roomID is exist
    // If exist, return error
    meet_model_1.default.count({
        roomID: roomID,
    }).then((count) => {
        if (count > 0) {
            return res.status(400).send({
                message: "Room ID is already exist.",
            });
        }
        else {
            meet_model_1.default.create({
                roomID: roomID,
                createdBy: createdBy,
                createdByName: createdByName,
                createdAt: Date.now(),
            })
                .then((result) => {
                return res.status(201).send(result);
            })
                .catch((error) => {
                console.error(`[error]: Error on creating a room ${error}`);
                return res.status(500).send({
                    message: "Internal server error.",
                });
            });
        }
    });
};
MeetController.checkRoomAvailablility = (req, res) => {
    const roomID = req.body.roomID;
    const availability = rtc_handler_1.rooms.get(roomID) == undefined ? 0 : rtc_handler_1.rooms.get(roomID).length;
    if (availability == 0) {
        return res.status(404).send({
            message: "There is no room with that ID.",
        });
    }
    else {
        return res.status(200).send({
            message: "OK",
        });
    }
};
MeetController.join = (req, res) => {
    // Join a certain room if exist
};
exports.default = MeetController;
