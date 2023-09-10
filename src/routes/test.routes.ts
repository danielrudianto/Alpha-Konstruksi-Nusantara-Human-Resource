import { Router } from "express";
import TestController from "../controllers/test.controller";
import AuthorizationMiddleware from "../utils/authorization.middleware";

const router = Router();

router.get("/", AuthorizationMiddleware.intercept, TestController.fetch);
router.post("/", AuthorizationMiddleware.intercept, TestController.create);

export default router;
