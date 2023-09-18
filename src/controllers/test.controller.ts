import { Request, Response } from "express";
import TestModel from "../models/test.model";
import TokenModel from "../models/token.model";

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
          await TestModel.create({
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
            files: files.map((x: any) => {
              return {
                name: x.name,
                size: x.size,
              };
            }),
            answer: null,
            questionID: questionID,
          });
        } else {
          const existingFiles: any[] = [];
          const newFiles: any[] = [];

          for (let i = 0; i < files.length; i++) {
            if (files[i].id == null) {
              newFiles.push(files[i]);
            } else {
              existingFiles.push(files[i].id);
            }
          }

          // Delete files
          for (let i = 0; i < result.files.length; i++) {
            if (!existingFiles.includes(result.files[i].id)) {
              result.files.splice(i, 1);
            }
          }

          for (let i = 0; i < newFiles.length; i++) {
            result.files.push({
              name: newFiles[i].name,
              size: newFiles[i].size,
              data: newFiles[i].data,
            });
          }

          result.submittedAt = new Date();
          await result.save();

          return res.status(201).send({
            files: result.files.map((x: any) => {
              return {
                id: x.id,
                name: x.name,
                size: x.size,
              };
            }),
            answer: null,
            questionID: questionID,
          });
        }
      })
      .catch((error) => {
        console.error(`[error]: Error on submitting test answer: ${error}`);
        return res.status(500).send(error);
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

      TestModel.find({
        token: token,
      }).then((answers) => {
        return res.status(200).send({
          questions: test.map((x: any) => {
            const answer = answers.find((y) => y.questionID === x.id);
            return {
              id: x.id,
              question: x.question,
              answer: answer ? answer.answer : null,
              files: answer
                ? answer.files.map((x: any) => {
                    return {
                      id: x.id,
                      name: x.name,
                      size: x.size,
                    };
                  })
                : [],
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

  static end = (req: Request, res: Response) => {
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
}

export default TestController;
