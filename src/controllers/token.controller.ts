import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import CurriculumModel from "../models/curriculum.model";
import TestModel from "../models/test.model";
import TokenModel from "../models/token.model";

class TokenController {
  static create = (req: Request, res: Response) => {};

  static check = (req: Request, res: Response) => {
    // Check if token is valid
    const token = req.body.token;
    TokenModel.findOne({
      token: token,
    }).then(async (result) => {
      if (!result) {
        return res.status(400).send({
          message: "Token not found.",
        });
      }

      if (result.expiredAt.getTime() < Date.now()) {
        return res.status(400).send({
          message: "Token expired.",
        });
      }

      result.status.push({
        status: "logged in",
        createdAt: Date.now(),
      });

      // Check if CV is submitted
      const submittedCV = await CurriculumModel.findOne({
        token: token,
      });

      const submittedTest = await TestModel.findOne({
        token: token,
      });

      await result.save();
      const jwt = sign(
        {
          token: token,
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: "2h",
        }
      );

      return res.status(200).send({
        token: jwt,
        submittedCV: submittedCV ? true : false,
        submittedTest: submittedTest ? true : false,
      });
    });
  };
}

export default TokenController;
