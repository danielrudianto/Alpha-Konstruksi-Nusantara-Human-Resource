import { Request, Response } from "express";
import TestModel from "../models/response.model";
import TokenModel from "../models/token.model";

interface uploadFile {
  name: string;
  data: string;
  size: number;
}

class TestController {
  static answer = (req: Request, res: Response) => {
    const questionID = req.body.questionID;
    const answer = req.body.answer;
    const files = req.body.files || [];
    const token = req.body.token;

    TestModel.findOne({
      token: token,
      questionID: questionID,
    })
      .then(async (result) => {
        if (!result) {
          await TestModel.create({
            questionID: questionID,
            answer: answer,
            token: token,
            submittedAt: new Date(),
          });

          return res.status(201).send({
            answer: answer,
            questionID: questionID,
          });
        } else {
          if (files && files.length > 0) {
            result.files = files;
            result.answer = answer;
            result.submittedAt = new Date();
            await result.save();

            return res.status(201).send({
              answer: answer,
              questionID: questionID,
            });
          } else {
            result.answer = answer;
            result.submittedAt = new Date();
            await result.save();

            return res.status(201).send({
              answer: answer,
              questionID: questionID,
            });
          }
        }
      })
      .catch((error) => {
        console.error(`[error]: Error on submitting test answer: ${error}`);
        return res.status(500).send(error);
      });
  };

  static files = (req: Request, res: Response) => {
    const questionID = req.body.questionID;
    const files = req.body.files;
    const token = req.body.token;

    TestModel.findOne({
      token: token,
      questionID: questionID,
    })
      .then(async (result) => {
        if (!result) {
          const createdTest = await TestModel.create({
            questionID: questionID,
            files: files.map((x: any) => {
              return {
                name: x.name,
                size: x.size,
                data: x.data,
              };
            }),
            answer: null,
            token: token,
            submittedAt: new Date(),
          });

          return res.status(201).send({
            files: createdTest.files.map((x) => {
              return {
                _id: x.id,
                name: x.name,
                size: x.size,
              };
            }),
            answer: null,
            questionID: questionID,
          });
        } else {
          return res.status(400).send({
            message: "Files already submitted.",
          });
        }
      })
      .catch((error) => {
        console.error(`[error]: Error on submitting test answer: ${error}`);
        return res.status(500).send(error);
      });
  };

  static fetchByToken = (req: Request, res: Response) => {
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

      TestModel.find({
        token: token,
      }).then((answers) => {
        return res.status(200).send({
          questions: test.map((x: any) => {
            const answer = answers.find((y) => y.questionID == x.id);
            const files = answer && answer.files != null ? answer.files : [];
            return {
              id: x.id,
              question: x.question,
              answer: answer ? answer.answer : null,
              files: files,
              attachment: x.attachment,
              notes: x.notes,
              type: x.type,
            };
          }),
          expiredAt: result.expiredAt,
        });
      });
    });
  };

  static endByToken = (req: Request, res: Response) => {
    const token = req.body.token;
    TokenModel.findOne({
      token: token,
    })
      .then(async (result) => {
        if (!result) {
          return res.status(400).send({
            message: "Token not found.",
          });
        }

        result.status.push({
          status: "test submitted",
          date: new Date(),
        });

        result.currentStatus = "test submitted";

        await result.save();
        return res.status(201).send(result);
      })
      .catch((error) => {
        return res.status(500).send(error);
      });
  };

  static check = (req: Request, res: Response) => {
    const token = req.body.token;
    TokenModel.findOne({
      token: token,
    }).then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Token not found.",
        });
      }

      result.status.push({
        status: "checked",
        date: new Date(),
      });

      result.currentStatus = "checked";

      result
        .save()
        .then(() => {
          return res.status(201).send(result);
        })
        .catch((error) => {
          console.error(`[error]: Error while saving token: ${error}`);
          return res.status(500).send({
            message: "Internal Server Error",
          });
        });
    });
  };

  static interview = async (req: Request, res: Response) => {
    const token = req.body.token;
    const tokenResult = await TokenModel.findOne({
      token: token,
    });

    if (!tokenResult) {
      return res.status(404).send({
        message: "Token not found.",
      });
    }

    if (tokenResult.currentStatus == "interview") {
      return res.status(400).send({
        message: "Token already interviewed.",
      });
    }

    if (tokenResult.currentStatus != "checked") {
      return res.status(400).send({
        message: "Token not checked.",
      });
    }

    tokenResult.status.push({
      status: "interview",
      date: new Date(),
    });

    tokenResult.currentStatus = "interview";

    tokenResult
      .save()
      .then((result) => {
        return res.status(201).send(result);
      })
      .catch((error) => {
        console.error(`[error]: Error on updating token: ${error}`);
        return res.status(500).send({
          message: "Internal Server Error",
        });
      });
  };

  static failed = async (req: Request, res: Response) => {
    const token = req.body.token;
    const tokenResult = await TokenModel.findOne({
      token: token,
    });

    if (!tokenResult) {
      return res.status(404).send({
        message: "Token not found.",
      });
    }

    if (tokenResult.currentStatus == "failed") {
      return res.status(400).send({
        message: "Token already interviewed.",
      });
    }

    if (
      tokenResult.currentStatus != "checked" &&
      tokenResult.currentStatus != "interview"
    ) {
      return res.status(400).send({
        message: "Token not checked.",
      });
    }

    tokenResult.status.push({
      status: "failed",
      date: new Date(),
    });

    tokenResult.currentStatus = "failed";

    tokenResult
      .save()
      .then((result) => {
        return res.status(201).send(result);
      })
      .catch((error) => {
        console.error(`[error]: Error on updating token: ${error}`);
        return res.status(500).send({
          message: "Internal Server Error",
        });
      });
  };

  static fetch = (req: Request, res: Response) => {
    const page = !req.query.page ? 1 : parseInt(req.query.page as string);
    const keyword = !req.query.keyword ? "" : req.query.keyword;
  };
}

export default TestController;
