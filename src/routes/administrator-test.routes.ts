import { Router } from "express";
import AuthorizationMiddleware from "../utils/authorization.middleware";

const router = Router();

router.get("/", AuthorizationMiddleware.interceptAdministrator, );

export default router;
