import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import CurriculumModel from "../models/curriculum.model";
import TokenModel from "../models/token.model";

class CurriculumController {
  static create = async (req: Request, res: Response) => {
    const token = req.body.token;
    const testToken = await TokenModel.findOne({
      token: token,
    });

    if (!testToken) {
      return res.status(400).send({
        message: "Token not found.",
      });
    }

    CurriculumModel.findOne({
      token: token,
    })
      .then((curriculum) => {
        if (curriculum) {
          return res.status(400).send({
            message: "Curriculum already submitted.",
          });
        }

        // Create curriculum
        CurriculumModel.create(req.body)
          .then(async (result) => {
            testToken.status.push({
              status: "cv submitted",
              date: new Date(),
            });

            // Set expiry date to 1 hour from now
            testToken.expiredAt = new Date(Date.now() + 60 * 60 * 1000);

            try {
              await testToken.save();
            } catch (error) {
              console.log(error);
            }
            return res.status(201).send(result);
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).send(error);
          });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send({
          message: "Internal server error.",
        });
      });
  };
}

export default CurriculumController;
