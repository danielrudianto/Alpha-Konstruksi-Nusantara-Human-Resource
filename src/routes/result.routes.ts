import { Router } from "express";
import ResultController from "../controllers/result.controller";

const router = Router();

router.get("/", ResultController.fetch);

export default router;
