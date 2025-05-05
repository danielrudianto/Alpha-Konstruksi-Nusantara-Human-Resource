import { Router } from "express";
import { body } from "express-validator";
import MeetController from "../controllers/meet.controller";
import AuthorizationMiddleware from "../utils/authorization.middleware";

const router = Router();

router.post("/availability", MeetController.checkRoomAvailablility);

router.post(
  "/",
  AuthorizationMiddleware.interceptAdministrator,
  body("roomID").notEmpty().withMessage("Room ID is required."),
  MeetController.create
);

export default router;
