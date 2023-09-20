import { Router } from "express";
import ResultController from "../controllers/result.controller";
import AuthorizationMiddleware from "../utils/authorization.middleware";

const router = Router();

router.get("/", ResultController.fetch);
router.get(
  "/check-answer/:token",
  AuthorizationMiddleware.interceptAdministrator,
  ResultController.fetchByToken
);

router.put(
  "/update-score",
  AuthorizationMiddleware.interceptAdministrator,
  ResultController.updateScore
);

export default router;
