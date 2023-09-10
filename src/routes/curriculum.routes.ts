import { Router } from "express";
import CurriculumController from "../controllers/curriculum.controller";
import AuthorizationMiddleware from "../utils/authorization.middleware";

const router = Router();

router.post(
  "/",
  AuthorizationMiddleware.intercept,
  CurriculumController.create
);

export default router;
