import { compare, hashSync } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import userModel from "../models/user.model";

class AuthController {
  static login = (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;

    userModel
      .findOne({
        username: username,
      })
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            message: "User not found",
          });
        }

        compare(password, user.password)
          .then((value) => {
            if (value) {
              const token = sign(
                {
                  id: user._id,
                  name: user.name,
                  username: user.username,
                },
                process.env.JWT_ADMINISTRATOR_SECRET!,
                {
                  expiresIn: "7d",
                }
              );

              return res.status(201).send({
                token: token,
                name: user.name,
              });
            } else {
              return res.status(401).send({
                message: "Wrong password",
              });
            }
          })
          .catch((error) => {
            console.error(`[error]: Error on login: ${error}`);
            return res.status(500).send({
              message: "Internal Server Error",
            });
          });
      })
      .catch((error) => {
        console.error(`[error]: Error on login: ${error}`);
        return res.status(500).send({
          message: "Internal Server Error",
        });
      });
  };
}

export default AuthController;
