import { Request, Response } from "express";
import { ErrorList } from "../data/error-list";
import TokenModel from "../model/token.model";
import { BadRequestError } from "@terra-nusa-teknologi/alpha-konstruksi-nusantara-common";

class TokenController {
  static generateToken = (req: Request, res: Response) => {
    // Generate a 36 character token
    const character =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let token = "";
    for (let i = 0; i < 36; i++) {
      token += character[Math.floor(Math.random() * character.length)];
    }

    const date = new Date();
    const expiryDate = new Date(date.setDate(date.getDate() + 1));
    date.setHours(0, 0, 0, 0);
    expiryDate.setHours(0, 0, 0, 0);
    const candidateName = req.body.candidateName;

    TokenModel.create({
      token: token,
      createdBy: req.body.createdBy,
      createdByName: req.body.createdByName,
      testID: req.body.testID,
      createdAt: date,
      expiryDate: expiryDate,
      candidateName: candidateName,
    })
      .then((result) => {
        return res.status(201).send(result);
      })
      .catch((error) => {
        console.error(`[error]: Error on generating token: ${error}`);
        throw new BadRequestError(ErrorList["INTERNAL_SERVER_ERROR"]);
      });
  };

  static checkToken = (req: Request, res: Response) => {
    const token = req.params.token;
    TokenModel.findOne({
      token: token,
    })
      .then((result) => {
        if (!token) {
          return res.status(404).send({
            message: ErrorList["TOKEN_NOT_FOUND"],
          });
        }

        return res.status(200).send(result);
      })
      .catch((error) => {
        console.error(`[error]: Error on checking token: ${error}`);

        return res.status(500).send({
          message: ErrorList["INTERNAL_SERVER_ERROR"],
        });
      });
  };

  static updateTokenStatus = (req: Request, res: Response) => {
    const token = req.body.token;
    const status = req.body.status;
    // If it was pristine, can only be updated to active or expired
    // If it was active, can only be updated to expired
    // If it was expired, cannot be updated

    TokenModel.findOne({
      token: token,
    }).then((result) => {
      if (!result) {
        return res.status(404).send({
          message: ErrorList["TOKEN_NOT_FOUND"],
        });
      }

      if (
        result.status === "pristine" &&
        (status == "active" || status == "expired")
      ) {
        TokenModel.updateOne(
          {
            token: token,
          },
          {
            status: status,
          }
        )
          .then((result) => {
            return res.status(200).send(result);
          })
          .catch((error) => {
            console.error(`[error]: Error on updating token status: ${error}`);
            return res.status(500).send({
              message: ErrorList["INTERNAL_SERVER_ERROR"],
            });
          });
      }

      if (result.status === "active" && status == "expired") {
        TokenModel.updateOne(
          {
            token: token,
          },
          {
            status: status,
          }
        )
          .then((result) => {
            return res.status(200).send(result);
          })
          .catch((error) => {
            console.error(`[error]: Error on updating token status: ${error}`);
            return res.status(500).send({
              message: ErrorList["INTERNAL_SERVER_ERROR"],
            });
          });
      }

      if (result.status === "expired") {
        return res.status(400).send({
          message: ErrorList["TOKEN_EXPIRED"],
        });
      }

      return res.status(400).send({
        message: ErrorList["TOKEN_NOT_FOUND"],
      });
    });
  };
}

export default TokenController;
