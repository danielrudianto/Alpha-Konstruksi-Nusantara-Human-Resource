import { Request, Response } from "express";
import CurriculumModel from "../models/curriculum.model";
import TestModel from "../models/test.model";
import TokenModel from "../models/token.model";

class ResultController {
  static fetch = async (req: Request, res: Response) => {
    const page = !req.query.page ? 1 : parseInt(req.query.page as string);
    const status = req.query.mode;

    switch (status) {
      case "checked":
        const tokens = await TokenModel.find({
          currentStatus: "checked",
        })
          .skip((page - 1) * 10)
          .limit(10);

        const curriculum = await CurriculumModel.find({
          token: {
            $in: tokens.map((x) => x.token),
          },
        });

        const result = await TestModel.aggregate([
          {
            $match: {
              token: {
                $in: tokens.map((x) => x.token),
              },
            },
          },
          {
            $group: {
              _id: "$token",
              totalScore: {
                $sum: "$score",
              },
            },
          },
        ]);

        const response: any[] = [];
        curriculum.forEach((x) => {
          const token = tokens.find((y) => y.token == x.token);
          const scoreIndex = result.findIndex((z) => {
            return z._id == x.token;
          });

          response.push({
            token: token,
            curriculum: x,
            score: scoreIndex != -1 ? result[scoreIndex].totalScore : 0,
          });
        });

        return res.status(200).send({
          data: response,
        });
      case "unchecked":
        let uncheckedTokens = await TokenModel.find({
          $or: [
            {
              currentStatus: "test submitted",
            },
            {
              currentStatus: "cv submitted",
            },
          ],
        })
          .skip((page - 1) * 10)
          .limit(10);

        let uncheckedCurriculums = await CurriculumModel.find({
          token: {
            $in: uncheckedTokens.map((x) => x.token),
          },
        });

        const uncheckedResult = await TestModel.aggregate([
          {
            $match: {
              token: {
                $in: uncheckedTokens.map((x) => x.token),
              },
            },
          },
          {
            $group: {
              _id: "$token",
              totalScore: {
                $sum: "$score",
              },
            },
          },
        ]);

        const uncheckResponse: any[] = [];
        uncheckedCurriculums.forEach((x) => {
          const token = uncheckedTokens.find((y) => y.token == x.token);
          const scoreIndex = uncheckedResult.findIndex((z) => {
            return z._id == x.token;
          });

          uncheckResponse.push({
            token: token,
            curriculum: x,
            score:
              scoreIndex != -1 ? uncheckedResult[scoreIndex].totalScore : 0,
          });
        });

        return res.status(200).send({
          data: uncheckResponse,
        });
        break;
      case "interview":
        let interviewTokens = await TokenModel.find({
          currentStatus: "interview",
        })
          .skip((page - 1) * 10)
          .limit(10);

        let interviewCurriculums = await CurriculumModel.find({
          token: {
            $in: interviewTokens.map((x) => x.token),
          },
        });

        const interviewResult = await TestModel.aggregate([
          {
            $match: {
              token: {
                $in: interviewTokens.map((x) => x.token),
              },
            },
          },
          {
            $group: {
              _id: "$token",
              totalScore: {
                $sum: "$score",
              },
            },
          },
        ]);

        const interviewResponse: any[] = [];
        interviewCurriculums.forEach((x) => {
          const token = interviewTokens.find((y) => y.token == x.token);
          const scoreIndex = interviewResult.findIndex((z) => {
            return z._id == x.token;
          });

          interviewResponse.push({
            token: token,
            curriculum: x,
            score:
              scoreIndex != -1 ? interviewResult[scoreIndex].totalScore : 0,
          });
        });

        return res.status(200).send({
          data: interviewResponse,
        });
        break;
      case "failed":
        let failedTokens = await TokenModel.find({
          currentStatus: "failed",
        })
          .skip((page - 1) * 10)
          .limit(10);

        let failedCurriculums = await CurriculumModel.find({
          token: {
            $in: failedTokens.map((x) => x.token),
          },
        });

        const failedResult = await TestModel.aggregate([
          {
            $match: {
              token: {
                $in: failedTokens.map((x) => x.token),
              },
            },
          },
          {
            $group: {
              _id: "$token",
              totalScore: {
                $sum: "$score",
              },
            },
          },
        ]);

        const failedResponse: any[] = [];
        failedCurriculums.forEach((x) => {
          const token = failedTokens.find((y) => y.token == x.token);
          const scoreIndex = failedResult.findIndex((z) => {
            return z._id == x.token;
          });

          failedResponse.push({
            token: token,
            curriculum: x,
            score: scoreIndex != -1 ? failedResult[scoreIndex].totalScore : 0,
          });
        });

        return res.status(200).send({
          data: failedResponse,
        });
        break;
      case "all":
      default:
        let allTokens = await TokenModel.find({
          $or: [
            {
              currentStatus: "test submitted",
            },
            {
              currentStatus: "cv submitted",
            },
          ],
        })
          .skip((page - 1) * 10)
          .limit(10);

        let allCurriculums = await CurriculumModel.find({
          token: {
            $in: allTokens.map((x) => x.token),
          },
        });

        const allResult = await TestModel.aggregate([
          {
            $match: {
              token: {
                $in: allTokens.map((x) => x.token),
              },
            },
          },
          {
            $group: {
              _id: "$token",
              totalScore: {
                $sum: "$score",
              },
            },
          },
        ]);

        const allResponse: any[] = [];
        allCurriculums.forEach((x) => {
          const token = allTokens.find((y) => y.token == x.token);
          const scoreIndex = allResult.findIndex((z) => {
            return z._id == x.token;
          });

          allResponse.push({
            token: token,
            curriculum: x,
            score: scoreIndex != -1 ? allResult[scoreIndex].totalScore : 0,
          });
        });

        return res.status(200).send({
          data: allResponse,
        });
        break;
    }
  };

  static fetchByToken = (req: Request, res: Response) => {
    const token = req.params.token;
    TokenModel.findOne({
      token: token,
    }).then(async (result) => {
      if (!result) {
        return res.status(404).send({
          message: "Token not found.",
        });
      }

      const tests = await TestModel.find({
        token: token,
      });

      const curriculum = await CurriculumModel.findOne({
        token: token,
      });

      const response: any[] = [];
      const testSet = require(`../data/tests/${result.testName}.json`);
      testSet.forEach((question: any) => {
        const answerIndex = tests.findIndex((x: any) => {
          return x.questionID == question.id;
        });

        response.push({
          id: question.id,
          answer:
            answerIndex == -1
              ? ""
              : tests[answerIndex].answer?.replace(/(?:\r\n|\r|\n)/g, "<br>"),
          files: (answerIndex == -1 ? [] : tests[answerIndex].files) || [],
          question: question.question,
          score: answerIndex == -1 ? 0 : tests[answerIndex].score,
        });
      });

      return res.status(200).send({
        curriculum: curriculum,
        data: response,
      });
    });
  };

  static updateScore = async (req: Request, res: Response) => {
    const score = req.body.score;
    const token = req.body.token;
    const id = req.body.id;

    const test = await TestModel.findOne({
      token: token,
      questionID: id,
    });

    if (!test) {
      TestModel.create({
        token: token,
        questionID: id,
        score: score,
        answer: "",
        files: [],
        submittedAt: new Date(),
      })
        .then((result) => {
          return res.status(201).send(result);
        })
        .catch((error) => {
          console.error(`[error]: Error on create test. ${error}`);
          return res.status(500).send({
            message: "Internal Server Error",
          });
        });
    } else {
      test.score = score;
      test
        .save()
        .then((result) => {
          return res.status(201).send(result);
        })
        .catch((error) => {
          console.error(`[error]: Error on create test. ${error}`);
          return res.status(500).send({
            message: "Internal Server Error",
          });
        });
    }
  };
}

export default ResultController;
