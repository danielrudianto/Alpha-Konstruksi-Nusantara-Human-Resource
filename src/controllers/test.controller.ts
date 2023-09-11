import { Request, Response } from "express";
import TestModel from "../models/test.model";
import TokenModel from "../models/token.model";

class TestController {
  static create = (req: Request, res: Response) => {
    const answer = req.body;
    const token = req.body.token;

    TokenModel.findOne({
      token: token,
    }).then((result) => {
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

      if (result.status.find((x) => x.status === "test submitted")) {
        return res.status(400).send({
          message: "Test already submitted.",
        });
      }

      if (!result.status.find((x) => x.status === "cv submitted")) {
        return res.status(400).send({
          message: "CV not submitted.",
        });
      }

      result.status.push({
        status: "test submitted",
        createdAt: Date.now(),
      });

      result.save().then(() => {
        TestModel.create({
          token: token,
          result: 0,
          answer: answer,
        })
          .then(() => {
            return res.status(200).send({
              token: token,
            });
          })
          .catch((error) => {
            console.error(`[error]: Error on creating test. ${error}`);
            return res.status(500).send({
              message: "Internal server error.",
            });
          });
      });
    });
  };

  static fetch = (req: Request, res: Response) => {
    const token = req.body.token;
    TokenModel.findOne({
      token: token,
    }).then((result) => {
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

      if (result.status.find((x) => x.status === "test submitted")) {
        return res.status(400).send({
          message: "Test already submitted.",
        });
      }

      if (!result.status.find((x) => x.status === "cv submitted")) {
        return res.status(400).send({
          message: "CV not submitted.",
        });
      }

      const testFile = result.testName;
      // Read from file
      const test = require(`../data/tests/${testFile}.json`);

      return res.status(200).send({
        questions: test,
        expiredAt: result.expiredAt,
      });
    });
  };
}

export default TestController;
