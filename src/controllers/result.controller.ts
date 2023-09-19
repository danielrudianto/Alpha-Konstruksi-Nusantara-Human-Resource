import { Request, Response } from "express";
import CurriculumModel from "../models/curriculum.model";
import TestModel from "../models/test.model";
import TokenModel from "../models/token.model";

class ResultController {
  static fetch = (req: Request, res: Response) => {
    const page = !req.query.page ? 1 : parseInt(req.query.page.toString());
    const status = !req.query.status ? "all" : req.query.status.toString();

    switch (status.toLowerCase()) {
      case "test-submitted":
        break;
      case "all":
      default:
        Promise.all([
          CurriculumModel.find({})
            .limit(20)
            .skip((page - 1) * 20),
          CurriculumModel.count({}),
        ])
          .then((curriculums) => {
            const curriculum = curriculums[0];
            const count = curriculums[1];
            TokenModel.find({
              token: {
                $in: curriculum.map((curriculum) => curriculum.token),
              },
            })
              .then((tokens) => {
                return res.status(200).send({
                  data: curriculum.map((x) => {
                    return {
                      token: x.token,
                      name: x.name,
                      email: x.email,
                      phoneNumber: x.phoneNumber,
                      nickName: x.nickName,
                      status: tokens.find((y) => y.token == x.token)
                        ?.currentStatus,
                      age:
                        (new Date().getTime() - x.dateOfBirth.getTime()) /
                        (1000 * 60 * 60 * 24 * 365),
                      result: 0,
                    };
                  }),
                  count: count,
                });
              })
              .catch((error) => {
                console.error(
                  `[error]: Error on fetching tokens. ${error.message}`
                );
                return res.status(500).send({
                  message: "Internal server error",
                });
              });
          })
          .catch((error) => {
            console.error(
              `[error]: Error on fetching curriculums. ${error.message}`
            );
            return res.status(500).send({
              message: "Internal server error",
            });
          });
        break;
    }
  };
}

export default ResultController;
