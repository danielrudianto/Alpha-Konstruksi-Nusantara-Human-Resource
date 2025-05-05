import { Request, Response } from "express";
import { Socket } from "socket.io";
import MeetModel from "../models/meet.model";
import { rooms, RTCHandler } from "../utils/rtc.handler";

class MeetController {
  public static create = (req: Request, res: Response) => {
    // Create a room
    const roomID = req.body.roomID;
    const createdBy = req.body.meta__createdBy;
    const createdByName = req.body.meta__createdByName;

    // Check if roomID is exist
    // If exist, return error
    MeetModel.count({
      roomID: roomID,
    }).then((count) => {
      if (count > 0) {
        return res.status(400).send({
          message: "Room ID is already exist.",
        });
      } else {
        MeetModel.create({
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

  public static checkRoomAvailablility = (req: Request, res: Response) => {
    const roomID = req.body.roomID;

    const availability =
      rooms.get(roomID) == undefined ? 0 : rooms.get(roomID)!.length;
    if (availability == 0) {
      return res.status(404).send({
        message: "There is no room with that ID.",
      });
    } else {
      return res.status(200).send({
        message: "OK",
      });
    }
  };

  public static join = (req: Request, res: Response) => {
    // Join a certain room if exist
  };
}

export default MeetController;
