import { Router } from "express";
import OpeningController from "../controllers/opening.controller";
import AuthorizationMiddleware from "../utils/authorization.middleware";

const router = Router();

router.get(
  "/",
  AuthorizationMiddleware.interceptAdministrator,
  OpeningController.fetch
);

export default router;
