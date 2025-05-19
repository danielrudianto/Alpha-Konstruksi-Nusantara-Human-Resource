import { NextFunction, Request, Response, Router } from "express";
import AuthController from "../controllers/auth.controller";

const router = Router();

router.post(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("masuk sini 1");
    next();
  },
  AuthController.login
);

export default router;
