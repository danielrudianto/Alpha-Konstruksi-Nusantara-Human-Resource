import { Router } from "express";
import VacancyController from "../controllers/vacancy.controller";

const router = Router();

router.post("/", VacancyController.create);

export default router;
