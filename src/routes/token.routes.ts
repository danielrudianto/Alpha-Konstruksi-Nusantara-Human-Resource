import { Router } from "express";
import TokenController from "../controllers/token.controller";

const router = Router();

router.post("/check", TokenController.check);
router.post("/");

export default router;
