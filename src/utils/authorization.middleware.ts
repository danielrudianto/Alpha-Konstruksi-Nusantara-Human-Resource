import { NextFunction, Request, Response } from "express";
import { decode } from "jsonwebtoken";
import TokenModel from "../models/token.model";

class AuthorizationMiddleware {
  static intercept = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers["authorization"]?.toString() || "";
    if (!authorization) {
      return res.status(401).send({
        message: "Token not found.",
      });
    }

    const jwtToken = authorization.split(" ")[1];
    if (!jwtToken) {
      return res.status(401).send({
        message: "Token not found.",
      });
    }

    const payload = decode(jwtToken);
    if (!payload || typeof payload === "string") {
      return res.status(401).send({
        message: "Token not found.",
      });
    }

    const token = payload!.token;
    TokenModel.findOne({
      token: token,
    }).then((result) => {
      // Check if token is valid
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

      req.body.token = result.token;
      next();
    });
  };
}

export default AuthorizationMiddleware;
