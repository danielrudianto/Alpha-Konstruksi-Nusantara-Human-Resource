import { Router } from "express";
import TestController from "../controllers/test.controller";
import AuthorizationMiddleware from "../utils/authorization.middleware";

const router = Router();

router.get("/", AuthorizationMiddleware.intercept, TestController.fetch);
router.post("/end", AuthorizationMiddleware.intercept, TestController.end);
router.post("/files", AuthorizationMiddleware.intercept, TestController.files);
router.post("/", AuthorizationMiddleware.intercept, TestController.answer);

export default router;
